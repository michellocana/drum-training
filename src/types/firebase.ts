import { User } from 'firebase/auth'

export type FirebaseUser = User | null

export type Optin = {} | null

export type FirebaseContextType = {
  auth: {
    user: FirebaseUser
    optin: Optin
    isLogged: boolean
    login(email: string, password: string): Promise<User | void>
    logout(): Promise<void>
  }
  database: {
    read(path: string): Promise<void>
    write(path: string, value: unknown): Promise<void>
  }
}
