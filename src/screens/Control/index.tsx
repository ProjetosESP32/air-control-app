import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Button, Heading, HStack, Icon, IconButton, Text, VStack } from 'native-base'
import React, { FC, useEffect } from 'react'
import { useAlertDialog } from '../../hooks/useAlertDialog'
import { useUser } from '../../hooks/useUser'
import { StackNavigation, StackProp } from '../../types/AppRoutes'
import { useControl } from './useControl'

export interface ControlPageProps {
  roomId: number
}

export const Control: FC = () => {
  const { roomId } = useRoute<StackProp<'Control'>>().params
  const navigation = useNavigation<StackNavigation<'Control'>>()
  const { data } = useUser()
  const {
    isLoading,
    power,
    temperature,
    isWiFiConnected,
    changePower,
    increaseTemperature,
    decreaseTemperature,
    handleWiFiConnection,
    disconnectFromWiFi,
  } = useControl(roomId)
  const { dialog } = useAlertDialog()

  const room = data?.rooms?.find(({ id }) => id === roomId)

  useEffect(() => {
    if (!room) {
      navigation.goBack()
    }
  }, [navigation, room])

  useEffect(() => {
    if (isWiFiConnected) {
      return navigation.addListener('beforeRemove', async e => {
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
            {temperature}°C
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
      </VStack>
    </Box>
  )
}
