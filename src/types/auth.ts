import { User } from 'firebase/auth'

export type FirebaseUser = User | null
export type ExtraData = { type: 'firstName'; value: string } | { type: 'userName'; value: string }
export type ExtraDataValues = { [K in ExtraData['type']]: Extract<ExtraData, { type: K }>['value'] }
export type FullUser = User & Partial<ExtraDataValues>

export type AuthContextType = {
  user: FullUser | null
  hasOptin: boolean
  isLogged: boolean
  login(email: string, password: string): Promise<User | void>
  logout(): Promise<void>
}

export type UserTrack = {
  trackId: string
  loops: number
}
