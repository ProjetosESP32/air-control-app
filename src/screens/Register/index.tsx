import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Heading, VStack } from 'native-base'
import React, { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { Input } from '../../components/Input'
import { useRegiser } from '../../hooks/useRegister'
import { registerValidation } from './validation'

interface RegisterFormData extends FieldValues {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export const Register: FC = () => {
  const { mutateAsync, isLoading } = useRegiser()
  const { handleSubmit, control } = useForm<RegisterFormData>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    resolver: yupResolver(registerValidation),
  })

  const onSubmit = async (data: RegisterFormData) => {
    Keyboard.dismiss()

    try {
      await mutateAsync(data)
    } catch (err) {
      console.error(err)
    }
  }

  const onError = () => {
    console.log('error')
  }

  const submitHandler = handleSubmit(onSubmit, onError)

  return (
    <VStack safeArea flex={1} space={2} p={6} justifyContent='center' >
      <Heading textAlign='center'>Registro</Heading>
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
      <Input
        label='Senha'
        name='password'
        placeholder='Digite sua senha'
        keyboardType='visible-password'
        textContentType='newPassword'
        autoComplete='password-new'
        type='password'
        control={control}
        formControlProps={{ isRequired: true }}
      />
      <Input
        label='Confirmação de senha'
        name='password'
        placeholder='Confirme sua senha'
        keyboardType='visible-password'
        textContentType='newPassword'
        autoComplete='password-new'
        type='password'
        control={control}
        formControlProps={{ isRequired: true }}
      />
      <Button disabled={isLoading} onPress={submitHandler}>
        Registrar
      </Button>
    </VStack>
  )
}
