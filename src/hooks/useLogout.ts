import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api, clearApiAuthorization } from '../utils/api'

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ['logout'],
    async () => {
      await api.delete('v1/auth/logout')
    },
    {
      onSettled: async () => {
        await clearApiAuthorization()
        await queryClient.resetQueries()
      },
    },
  )
}
