import { User } from './User'

export interface SessionResponse {
  user: User
  token: {
    type: string
    token: string
    expires_at: string
  }
}
