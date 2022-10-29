import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Button, Heading, HStack, Icon, IconButton, Text, VStack } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import WifiManager from 'react-native-wifi-reborn'
import { useUser } from '../../hooks/useUser'
import { StackNavigation, StackProp } from '../../types/AppRoutes'
import { checkLocationPermission, requestLocationPermission } from '../../utils/permission'
import { send } from '../../utils/socket'

export interface ControlPageProps {
  roomId: number
}

const TEMP_MAX = 27
const TEMP_MIN = 18

export const Control: FC = () => {
  const { roomId } = useRoute<StackProp<'Control'>>().params
  const navigation = useNavigation<StackNavigation<'Control'>>()
  const { data } = useUser()
  const [temperature, setTemperature] = useState(TEMP_MIN)
  const [powerStatus, setPowerStatus] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const room = data?.rooms?.find(({ id }) => id === roomId)

  const sendCommand = async (command: string) => {
    setIsLoading(true)
    try {
      const receivedData = Number(await send(command))

      if (!isNaN(receivedData)) {
        setPowerStatus(!!receivedData)

        if (receivedData > 1) {
          setTemperature(receivedData)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const increaseTemperature = async () => {
    const newTemperature = temperature + 1

    if (newTemperature > TEMP_MAX) return

    await sendCommand(newTemperature.toString())
  }

  const decreaseTemperature = async () => {
    const newTemperature = temperature - 1

    if (newTemperature < TEMP_MIN) return

    await sendCommand(newTemperature.toString())
  }

  const changePower = async () => {
    await sendCommand(powerStatus ? '0' : '1')
  }

  const handleConnection = async () => {
    const hasGranted = await checkLocationPermission()

    if (!hasGranted) {
      const result = await requestLocationPermission()

      if (!result) return
    }

    if (isConnected) {
      try {
        await WifiManager.forceWifiUsageWithOptions(false, { noInternet: false })
        await WifiManager.disconnect()
      } catch (err) {
        console.error(err)
      } finally {
        setIsConnected(false)
      }
      return
    }

    try {
      await WifiManager.connectToProtectedSSID('ESP32Server', '12345678', false)
      await WifiManager.forceWifiUsageWithOptions(true, { noInternet: true })
      setIsConnected(true)
    } catch (err) {
      setIsConnected(false)
      console.error('Não foi possível conectar', err)
    }
  }

  useEffect(() => {
    if (!room) {
      navigation.goBack()
    }
  }, [navigation, room])

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
          {powerStatus ? 'Ligado' : 'Desligado'}
        </Text>
        <VStack bg='light.50' shadow={1} rounded='lg' w='full' p={2} space={1}>
          <Text textAlign='center' fontSize='xl' color='primary.400' fontWeight='bold'>
            Temperatura atual
          </Text>
          <Text textAlign='center' fontSize='xl' color='primary.400' fontWeight='bold'>
            {temperature}°C
          </Text>
        </VStack>
        <IconButton
          variant='outline'
          onPress={increaseTemperature}
          disabled={!powerStatus || isLoading || !isConnected}
          size='lg'
          icon={<Icon as={Feather} name='plus' color='primary.400' size='3xl' />}
        />
        <IconButton
          variant='outline'
          onPress={decreaseTemperature}
          disabled={!powerStatus || isLoading || !isConnected}
          size='lg'
          icon={<Icon as={Feather} name='minus' color='primary.400' size='3xl' />}
        />
        <IconButton
          variant='outline'
          onPress={changePower}
          size='lg'
          icon={<Icon as={Feather} name='power' color={powerStatus ? 'red.500' : 'primary.400'} size='3xl' />}
          disabled={isLoading || !isConnected}
        />
        <Button onPress={handleConnection} disabled={isLoading}>
          {isConnected ? 'Desconectar' : 'Conectar'}
        </Button>
      </VStack>
    </Box>
  )
}
