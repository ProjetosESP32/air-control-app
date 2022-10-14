import { useQuery } from '@tanstack/react-query'
import { User } from '../types/User'
import { api } from '../utils/api'

export const useUser = () =>
  useQuery(['user'], async ({ signal }) => {
    const { data } = await api.get<User>('v1/users/me', { signal })

    return data
  }, {
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
