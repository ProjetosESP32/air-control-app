import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SessionResponse } from '../types/SessionResponse'
import { api, setApiAuthorization } from '../utils/api'

interface RegisterData {
  email: string
  password: string
}

export const useRegiser = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ['register'],
    async (registerData: RegisterData) => {
      const { data } = await api.post<SessionResponse>('v1/auth/register', registerData)

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
