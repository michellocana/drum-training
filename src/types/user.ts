import { User } from 'firebase/auth'

export type FirebaseUser = User | null
export type ExtraData = { type: 'firstName'; value: string }
export type FullUser = User & Partial<ExtraData>

export type FirebaseContextType = {
  auth: {
    user: FullUser | null
    hasOptin: boolean
    isLogged: boolean
    login(email: string, password: string): Promise<User | void>
    logout(): Promise<void>
  }
}

export type UserTrack = {
  trackId: string
  loops: number
}
