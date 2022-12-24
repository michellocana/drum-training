import { initializeApp } from 'firebase/app'
import * as firebaseDb from 'firebase/database'
import * as firebaseAuth from 'firebase/auth'

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FIREBASE_CONFIG } from '../constants/firebase'
import { FirebaseContextType, FirebaseUser } from '../types/firebase'

const noop = async () => {}

const FirebaseContext = createContext<FirebaseContextType>({
  auth: {
    user: null,
    isLogged: false,
    login: noop,
  },
  database: {
    read: noop,
    write: noop,
  },
})

initializeApp(FIREBASE_CONFIG)

export default function FirebaseProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseUser>(null)
  const database = useMemo(() => firebaseDb.getDatabase(), [])
  const auth = useMemo(() => firebaseAuth.getAuth(), [])
  const isLogged = user !== null

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [auth])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { user } = await firebaseAuth.signInWithEmailAndPassword(auth, email, password)
        return user
      } catch (error) {
        console.log(error)
      }
    },
    [auth],
  )

  const writeOnDatabase = useCallback(
    async (path: string, value: unknown) => {
      await firebaseDb.set(firebaseDb.ref(database, path), value)
    },
    [database],
  )

  return (
    <FirebaseContext.Provider
      value={{
        auth: {
          login,
          isLogged,
          user,
        },
        database: {
          read: noop,
          write: writeOnDatabase,
        },
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export function useAuth() {
  return useContext(FirebaseContext).auth
}

export function useDatabase() {
  return useContext(FirebaseContext).database
}
