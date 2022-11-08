import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../utils/api'

export const useChangePower = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    ['changePower', id],
    async () => {
      await api.post(`v1/rooms/control/${id}/power`)
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['room', 'control', id])
      },
    },
  )
}
