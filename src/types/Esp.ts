import { EspStatus } from './EspStatus'
import { Room } from './Room'

export interface Esp {
  id: number
  roomId?: number
  name: string
  macAddress: string
  isOn: boolean
  status?: EspStatus[]
  room?: Room
  createdAt: string
  updatedAt: string
}
