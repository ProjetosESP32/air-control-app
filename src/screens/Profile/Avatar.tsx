import { Feather } from '@expo/vector-icons'
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, useCameraPermissions } from 'expo-image-picker'
import { Avatar, Button, Icon, Menu, useDisclose } from 'native-base'
import React, { FC } from 'react'
import { useUser } from '../../hooks/useUser'
import { compressImage } from '../../utils/image'
import { getFirstLetters } from '../../utils/string'
import { getFullUrlResource } from '../../utils/url'

interface AvatarProfileProps {
  imageUri?: string | null
  onChange?: (imageUri: string) => void
}

export const AvatarProfile: FC<AvatarProfileProps> = ({ imageUri, onChange }) => {
  const { data } = useUser()
  const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions()
  const disclose = useDisclose(false)

  const handleCamera = async () => {
    if (!cameraPermissionStatus?.granted && cameraPermissionStatus?.canAskAgain) {
      const permissionStatus = await requestCameraPermission()

      if (!permissionStatus.granted) {
        return
      }
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: MediaTypeOptions.Images,
    })

    if (!result.cancelled) {
      const compressResult = await compressImage(result.uri)
      onChange?.(compressResult)
    }
  }

  const handleMediaLibrary = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: MediaTypeOptions.Images,
    })

    if (!result.cancelled) {
      const compressResult = await compressImage(result.uri)
      onChange?.(compressResult)
    }
  }

  const imageUrl = data!.cover ? getFullUrlResource(data!.cover.url) : undefined

  return (
    <>
      <Avatar source={{ uri: imageUri ?? imageUrl }} size='2xl'>
        {getFirstLetters(data!.username)}
        <Avatar.Badge bg='primary.400' alignItems='center' justifyContent='center'>
          <Icon as={Feather} name='camera' color='white' />
        </Avatar.Badge>
      </Avatar>
      <Menu
        {...disclose}
        trigger={props => (
          <Button {...props} variant='ghost' rightIcon={<Icon as={Feather} name='edit-2' color='primary.300' />}>
            Editar
          </Button>
        )}
      >
        <Menu.Item onPress={handleCamera}>Câmera</Menu.Item>
        <Menu.Item onPress={handleMediaLibrary}>Galeria</Menu.Item>
      </Menu>
    </>
  )
}
