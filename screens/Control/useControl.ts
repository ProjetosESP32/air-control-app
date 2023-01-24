import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SOCKET_HOST, SOCKET_PORT } from '../../constants/env'
import { TEMP_MAX, TEMP_MIN } from '../../constants/temperature'
import { useAlert } from '../../hooks/useAlert'
import { Socket } from '../../native/socket'
import { api } from '../../utils/api'
import { connectToWiFiAsync, disconnectFromWiFiAsync } from '../../utils/wifi'

const socket = new Socket(SOCKET_HOST, SOCKET_PORT)

export const useControl = (roomId: number) => {
  const queryClient = useQueryClient()
  const onSettled = async () => {
    await queryClient.invalidateQueries(['room', 'control', roomId])
  }
  const changePowerMutation = useMutation(
    ['changePower', roomId],
    async () => await api.post(`v1/rooms/control/${roomId}/power`),
    { onSettled },
  )
  const changeTemperatureMutation = useMutation(
    ['changeTemperature', roomId],
    async (temperature: number) => await api.post(`v1/rooms/control/${roomId}/temperature`, { temperature }),
    { onSettled },
  )
  const [power, setPower] = useState(false)
  const [temperature, setTemperature] = useState(TEMP_MIN)
  const [isSocketLoading, setIsSocketLoading] = useState(false)
  const [isWiFiConnected, setIsWiFiConnected] = useState(false)
  const { alert } = useAlert()

  const connectToWiFi = async () => {
    try {
      await connectToWiFiAsync()
      setIsWiFiConnected(true)
    } catch (err) {
      setIsWiFiConnected(false)

      if (err instanceof Error && err.message === 'NO_PERMISSION') {
        alert(
          {
            title: 'Sem permissão',
            description: 'Sem a permissão de localização, o aplicativo não consegue desconectar da rede do Ar',
            status: 'warning',
          },
          15000,
        )

        return
      }

      alert({ title: 'Erro!', description: 'Não foi possível conectar à rede do Ar', status: 'error' })
    }
  }

  const disconnectFromWiFi = async () => {
    try {
      await disconnectFromWiFiAsync()
      setIsWiFiConnected(false)
    } catch (err) {
      if (err instanceof Error && err.message === 'NO_PERMISSION') {
        alert(
          {
            title: 'Sem permissão',
            description: 'Sem a permissão de localização, o aplicativo não consegue desconectar da rede do Ar',
            status: 'warning',
          },
          15000,
        )

        return
      }

      alert({ title: 'Erro!', description: 'Não foi possível desconectar da rede do Ar', status: 'warning' })
    }
  }

  const handleWiFiConnection = async () => {
    if (isWiFiConnected) {
      await disconnectFromWiFi()
      return
    }

    await connectToWiFi()
  }

  const sendCommand = async (command: number) => {
    if (!isWiFiConnected) {
      if (command > 1) {
        changeTemperatureMutation.mutate(command, {
          onError: () => {
            alert({ title: 'Erro!', description: 'Não foi possível trocar a temperatura', status: 'error' })
          },
        })
      }

      return
    }

    setIsSocketLoading(true)

    try {
      const receivedMessage = await socket.sendAndReceive(command.toString(), 'utf-8')
      const receivedData = Number(receivedMessage)

      if (!isNaN(receivedData)) {
        setPower(!!receivedData)

        if (receivedData > 1) {
          setTemperature(receivedData)
        }
      }
    } catch (err) {
      alert({ title: 'Erro!', description: 'Não foi possível enviar o comando para o ar.', status: 'error' })
    } finally {
      setIsSocketLoading(false)
    }
  }

  const increaseTemperature = async () => {
    const newTemperature = temperature + 1

    if (newTemperature > TEMP_MAX) return

    await sendCommand(newTemperature)
  }

  const decreaseTemperature = async () => {
    const newTemperature = temperature - 1

    if (newTemperature < TEMP_MIN) return

    await sendCommand(newTemperature)
  }

  const changePower = async () => {
    await sendCommand(power ? 0 : 1)
  }

  return {
    power,
    temperature,
    isLoading: isSocketLoading || changePowerMutation.isLoading || changeTemperatureMutation.isLoading,
    isWiFiConnected,
    increaseTemperature,
    decreaseTemperature,
    changePower,
    handleWiFiConnection,
    disconnectFromWiFi,
  }
}
