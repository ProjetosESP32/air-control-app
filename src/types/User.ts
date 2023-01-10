import { Attachment } from './Attachment'
import { Room } from './Room'

export interface User {
  id: number
  username: string
  email: string
  isRoot: boolean
  isGoogleLinked: boolean
  cover?: Attachment | null
  emailVerifiedAt?: string | null
  rooms?: Room[]
  createdAt: string
  updatedAt: string
}
