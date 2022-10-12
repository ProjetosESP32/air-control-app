import { Esp } from './Esp'
import { Schedule } from './Schedule'

export interface Room {
  id: number
  name: string
  block: string
  floor: string
  createdAt: string
  updatedAt: string
  esps?: Esp[]
  schedules?: Schedule[]
}
