import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Button, HStack, Heading, Icon, IconButton, Spinner, Text, VStack } from 'native-base'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { SOCKET_HOST, SOCKET_PORT } from '../../constants/env'
import { TEMP_MAX, TEMP_MIN } from '../../constants/temperature'
import { useAlert } from '../../contexts/alert'
import { useAlertDialog } from '../../contexts/alert-dialog'
import { useUser } from '../../hooks/useUser'
import { Socket } from '../../native/socket'
import { Room } from '../../types/Room'
import { StackNavigation, StackProp } from '../../types/routes'
import { api } from '../../utils/api'
import { connectToWiFiAsync, disconnectFromWiFiAsync } from '../../utils/wifi'

interface RoomControlData {
  hasServices: boolean
  canEdit: boolean
  room: Room
}

export interface ControlPageProps {
  roomId: number
}

const socket = new Socket(SOCKET_HOST, SOCKET_PORT)

export const Control: FC = () => {
  const { roomId } = useRoute<StackProp<'Control'>>().params
  const navigation = useNavigation<StackNavigation<'Control'>>()

  const { data: user } = useUser()
  const { data: roomControl } = useQuery(
    ['room', 'control', roomId],
    async ({ signal }) => (await api.get<RoomControlData>(`v1/rooms/control/${roomId}`, { signal })).data,
  )

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
  const { dialog } = useAlertDialog()

  const room = roomControl?.room ?? user?.rooms?.find(({ id }) => id === roomId)
  const isLoading = isSocketLoading || changePowerMutation.isLoading || changeTemperatureMutation.isLoading

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

  const disconnectFromWiFi = useCallback(async () => {
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
  }, [alert])

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
      } else {
        changePowerMutation.mutate(undefined, {
          onError: () => {
            alert({
              title: 'Erro!',
              description: `Não foi possível ${command ? 'desligar' : 'ligar'} o ar`,
              status: 'error',
            })
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

  useEffect(() => {
    if (isWiFiConnected) {
      return navigation.addListener('beforeRemove', e => {
        e.preventDefault()

        dialog({
          title: 'Sair do controle?',
          description: 'Sair fará com que você desconecte da rede do Ar e terá que reconectar para enviar comandos.',
          actions: [
            {
              title: 'Sair',
              color: 'danger',
              doAction: async () => {
                await disconnectFromWiFi()
                navigation.dispatch(e.data.action)
              },
            },
          ],
        })
      })
    }
  }, [dialog, disconnectFromWiFi, isWiFiConnected, navigation])

  return (
    <Box flex={1} safeAreaX safeAreaBottom>
      <VStack flex={1} space={2} m={4} p={2} rounded='lg' shadow={1} bg='light.100'>
        <Heading textAlign='center'>Sala {room?.name}</Heading>
        <HStack space={2}>
          <HStack flex={1} justifyContent='center' space={2} p={2} bg='light.50' shadow={1} rounded='lg'>
            <Text color='primary.400' fontSize='lg'>
              Piso:
            </Text>
            <Text fontSize='lg'>{room?.floor}</Text>
          </HStack>
          <HStack flex={1} justifyContent='center' space={2} p={2} bg='light.50' shadow={1} rounded='lg'>
            <Text color='primary.400' fontSize='lg'>
              Bloco:
            </Text>
            <Text fontSize='lg'>{room?.block}</Text>
          </HStack>
        </HStack>
        <Text
          textAlign='center'
          fontSize='xl'
          color='primary.400'
          fontWeight='bold'
          shadow={1}
          rounded='lg'
          p={2}
          bg='light.50'
        >
          {power ? 'Ligado' : 'Desligado'}
        </Text>
        <VStack bg='light.50' shadow={1} rounded='lg' w='full' p={2} space={1}>
          <Text textAlign='center' fontSize='xl' color='primary.400' fontWeight='bold'>
            Temperatura atual
          </Text>
          <Text textAlign='center' fontSize='xl' color='primary.400' fontWeight='bold'>
            {temperature} °C
          </Text>
        </VStack>
        <IconButton
          variant='outline'
          onPress={increaseTemperature}
          disabled={!power || isLoading || !isWiFiConnected}
          size='lg'
          icon={<Icon as={Feather} name='plus' color='primary.400' size='3xl' />}
        />
        <IconButton
          variant='outline'
          onPress={decreaseTemperature}
          disabled={!power || isLoading || !isWiFiConnected}
          size='lg'
          icon={<Icon as={Feather} name='minus' color='primary.400' size='3xl' />}
        />
        <IconButton
          variant='outline'
          onPress={changePower}
          size='lg'
          icon={<Icon as={Feather} name='power' color={power ? 'red.500' : 'primary.400'} size='3xl' />}
          disabled={isLoading || !isWiFiConnected}
        />
        <Button onPress={handleWiFiConnection} disabled={isLoading}>
          {isWiFiConnected ? 'Desconectar' : 'Conectar'}
        </Button>
        {isLoading && (
          <HStack space={2} justifyContent='center' alignItems='center'>
            <Spinner size='lg' />
            <Text fontWeight='bold' color='primary.500'>
              Enviando...
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}
