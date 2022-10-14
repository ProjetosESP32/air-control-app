import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../types/User'
import { api } from '../utils/api'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ['updateUser'],
    async (formData: FormData) => {
      const { data } = await api.put<User>('v1/users', formData)

      return data
    },
    {
      onSuccess: user => {
        queryClient.setQueryData(['user'], user)
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(['user'])
      },
    },
  )
}
