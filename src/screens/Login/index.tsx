import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Heading, VStack } from 'native-base'
import React, { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { Input } from '../../components/Input'
import { withKeyboardAvoidingView } from '../../components/withKeyboardAvoidingView'
import { useAlert } from '../../hooks/useAlert'
import { useLogin } from '../../hooks/useLogin'
import { loginValidation } from './validation'

interface LoginFormData extends FieldValues {
  email: string
  password: string
}

const LoginComponent: FC = () => {
  const { mutateAsync, isLoading } = useLogin()
  const { handleSubmit, control } = useForm<LoginFormData>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    resolver: yupResolver(loginValidation),
  })
  const { alert } = useAlert()

  const onSubmit = async (data: LoginFormData) => {
    Keyboard.dismiss()

    try {
      await mutateAsync(data)
    } catch (err) {
      alert({ title: 'Ocorreu um erro!', description: 'Tente novamente mais tarde.', status: 'error' })
    }
  }

  const onError = () => {
    alert({ title: 'Formulário inválido!', description: 'Verifique seu formulário.', status: 'warning' })
  }

  const submitHandler = handleSubmit(onSubmit, onError)

  return (
    <VStack safeArea flex={1} space={2} p={6} justifyContent='center' >
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
      <Button disabled={isLoading} isLoading={isLoading} onPress={submitHandler}>
        Entrar
      </Button>
    </VStack>
  )
}

export const Login = withKeyboardAvoidingView(LoginComponent)
