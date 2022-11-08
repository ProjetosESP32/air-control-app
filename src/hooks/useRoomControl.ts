import { useQuery } from '@tanstack/react-query'
import { Room } from '../types/Room'
import { api } from '../utils/api'

interface RoomControlData {
  hasServices: boolean
  canEdit: boolean
  room: Room
}

export const useRoomControl = (id: number) =>
  useQuery(['room', 'control', id], async ({ signal }) => {
    const { data } = await api.get<RoomControlData>(`v1/rooms/control/${id}`, { signal })

    return data
  })
