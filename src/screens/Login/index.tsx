import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Heading, VStack } from 'native-base'
import React, { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { Input } from '../../components/Input'
import { useLogin } from '../../hooks/useLogin'
import { loginValidation } from './validation'

interface LoginFormData extends FieldValues {
  email: string
  password: string
}

export const Login: FC = () => {
  const { mutateAsync, isLoading } = useLogin()
  const { handleSubmit, control } = useForm<LoginFormData>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    resolver: yupResolver(loginValidation),
  })

  const onSubmit = async (data: LoginFormData) => {
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
    <VStack safeArea flex={1} space={2} p={6} justifyContent='center' bg='light.200'>
      <Heading textAlign='center'>
        Login
      </Heading>
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
        textContentType='password'
        autoComplete='password'
        type='password'
        control={control}
        formControlProps={{ isRequired: true }}
      />
      <Button disabled={isLoading} onPress={submitHandler}>
        Entrar
      </Button>
    </VStack>
  )
}
