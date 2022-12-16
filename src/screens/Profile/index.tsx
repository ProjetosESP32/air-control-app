import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Heading, VStack } from 'native-base'
import React, { FC, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { Input } from '../../components/Input'
import { withKeyboardAvoidingView } from '../../components/withKeyboardAvoidingView'
import { useAlert } from '../../hooks/useAlert'
import { useLogout } from '../../hooks/useLogout'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useUser } from '../../hooks/useUser'
import { AvatarProfile } from './Avatar'
import { profileValidation } from './validation'

interface ProfileFormData extends FieldValues {
  username: string
  email: string
}

const ProfileComponent: FC = () => {
  const { data: user } = useUser()
  const { mutate, isLoading: isInLoggof } = useLogout()
  const { mutateAsync, isLoading: isUpdating } = useUpdateUser()
  const [imageUri, setImageUri] = useState<string | null>(null)
  const { handleSubmit, control } = useForm<ProfileFormData>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    resolver: yupResolver(profileValidation),
    defaultValues: {
      username: user!.username,
      email: user!.email,
    },
  })
  const { alert } = useAlert()
  const isLoading = isInLoggof || isUpdating

  const onSubmit = async (data: ProfileFormData) => {
    Keyboard.dismiss()

    const changedItems = Object.entries(data).filter(([key, value]) => !!value && value !== (user as any)[key])

    if (changedItems.length === 0 && !imageUri) return

    const formData = new FormData()
    changedItems.forEach(([key, value]) => formData.append(key, value))

    if (imageUri) {
      formData.append('cover', {
        uri: imageUri,
        type: 'image/jpg',
        name: 'cover.jpg',
      } as any)
    }

    try {
      await mutateAsync(formData)
    } catch (err) {
      alert({ title: 'Ocorreu um erro!', description: 'Tente novamente mais tarde.', status: 'error' })
    } finally {
      setImageUri(null)
    }
  }

  const onError = () => {
    alert({ title: 'Formulário inválido!', description: 'Verifique seu formulário.', status: 'warning' })
  }

  const submitHandler = handleSubmit(onSubmit, onError)

  return (
    <Box safeArea flex={1}>
      <VStack flex={1} space={3} m={4} p={4} rounded='lg' shadow={1} bg='light.100' alignItems='center'>
        <Heading textAlign='center'>Perfil</Heading>
        <AvatarProfile imageUri={imageUri} onChange={setImageUri} />
        <Input
          label='Nome'
          name='username'
          placeholder='Digite seu nome de usuário'
          keyboardType='name-phone-pad'
          textContentType='username'
          autoComplete='name'
          type='text'
          control={control}
          formControlProps={{ isRequired: true }}
        />
        <Input
          label='E-mail'
          name='email'
          placeholder='Digite seu e-mail'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoComplete='email'
          type='text'
          control={control}
          formControlProps={{ isRequired: true }}
        />
        <Button onPress={submitHandler} w='full' disabled={isLoading} isLoading={isLoading}>
          Salvar
        </Button>
        <Button onPress={() => mutate()} w='full' bg='danger.600' disabled={isLoading}>
          Sair
        </Button>
      </VStack>
    </Box>
  )
}

export const Profile = withKeyboardAvoidingView(ProfileComponent)
