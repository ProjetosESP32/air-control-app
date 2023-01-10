import { ScheduleRepeat } from '../enums/ScheduleRepeat'
import { Room } from './Room'
import { ScheduleException } from './ScheduleException'

export interface Schedule {
  id: number
  roomId: number
  name: string
  scheduleDate: string
  startTime?: string
  endTime?: string
  isAllDay: boolean
  repeat: ScheduleRepeat
  repeatInterval: number
  daysOfWeek?: number[] | null
  weekNumber?: number | null
  daysOfMonth?: number[] | null
  timezone: string
  activeUntil: string
  createdAt: string
  updatedAt: string
  exceptions?: ScheduleException[]
  room?: Room
}
