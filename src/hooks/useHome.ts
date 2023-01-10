import { useQuery } from '@tanstack/react-query'
import { api } from '../utils/api'
import { Home } from '../types/Home'

export const useHome = () =>
  useQuery(['home'], async ({ signal }) => {
    const { data } = await api.get<Home>('v1/home', { signal })

    return data
  })
