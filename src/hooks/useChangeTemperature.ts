import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../utils/api'

export const useChangeTemperature = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    ['changeTemperature', id],
    async (temperature: number) => {
      await api.post(`v1/rooms/control/${id}/temperature`, { temperature })
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['room', 'control', id])
      },
    },
  )
}
