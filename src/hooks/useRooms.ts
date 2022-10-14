import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '../utils/api'
import { Paginate } from '../types/Paginate'
import { Room } from '../types/Room'

export const useRooms = () =>
  useInfiniteQuery(
    ['rooms'],
    async ({ pageParam, signal }) => {
      const pageParamUrl = pageParam ? String(pageParam) : ''
      const { data } = await api.get<Paginate<Room>>(`v1/rooms${pageParamUrl}`, { signal })

      return data
    },
    {
      getPreviousPageParam: ({ meta: { previousPageUrl } }) => previousPageUrl,
      getNextPageParam: ({ meta: { nextPageUrl } }) => nextPageUrl,
    },
  )
