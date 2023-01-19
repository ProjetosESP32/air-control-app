import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SessionResponse } from '../types/SessionResponse'
import { api, setApiAuthorization } from '../utils/api'

interface LoginData {
  email: string
  password: string
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ['login'],
    async (loginData: LoginData) => {
      const { data } = await api.post<SessionResponse>('v1/auth/login', loginData)

      return data
    },
    {
      onSuccess: async ({ token: { type, token }, user }) => {
        queryClient.setQueryData(['user'], user)
        await setApiAuthorization(type, token)
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(['user'])
      },
    },
  )
}
