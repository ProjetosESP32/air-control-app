import { Esp } from './Esp'

export interface EspStatus {
  id: number
  espId?: number
  temperature: number
  humidity: number
  potency: number
  esp?: Esp
  createdAt: string
  updatedAt: string
}
