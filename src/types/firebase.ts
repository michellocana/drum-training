import { User } from 'firebase/auth'

export type FirebaseUser = User | null
export type Optin = { firstName: string } | null
export type FullUser = User & Partial<Optin>

export type FirebaseContextType = {
  auth: {
    user: FullUser | null
    hasOptin: boolean
    isLogged: boolean
    login(email: string, password: string): Promise<User | void>
    logout(): Promise<void>
  }
  database: {
    read(path: string): Promise<void>
    write(path: string, value: unknown): Promise<void>
  }
}
