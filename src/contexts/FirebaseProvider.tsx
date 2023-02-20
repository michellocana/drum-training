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
import { useLocation, Navigate } from 'react-router-dom'
import { ROUTES, UNLOGGED_ROUTES } from '../constants/routes'

const noop = async () => {}

const FirebaseContext = createContext<FirebaseContextType>({
  auth: {
    user: null,
    isLogged: false,
    login: noop,
    logout: noop,
  },
  database: {
    read: noop,
    write: noop,
  },
})

initializeApp(FIREBASE_CONFIG)

export default function FirebaseProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<FirebaseUser>(null)
  const database = useMemo(() => firebaseDb.getDatabase(), [])
  const auth = useMemo(() => firebaseAuth.getAuth(), [])
  const location = useLocation()
  const isLogged = user !== null
  const isLoggedRoute = !UNLOGGED_ROUTES.includes(location.pathname)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsReady(true)
      setUser(user)
    })

    return () => unsubscribe()
  }, [auth])

  const login = useCallback(
    async (email: string, password: string) => {
      const { user } = await firebaseAuth.signInWithEmailAndPassword(auth, email, password)
      return user
    },
    [auth],
  )

  const logout = useCallback(async () => {
    await firebaseAuth.signOut(auth)
  }, [auth])

  const writeOnDatabase = useCallback(
    async (path: string, value: unknown) => {
      await firebaseDb.set(firebaseDb.ref(database, path), value)
    },
    [database],
  )

  const renderContent = useCallback(() => {
    if (!isReady) {
      // TODO: proper loader
      return 'Loading...'
    }

    if (isLogged && !isLoggedRoute) {
      return <Navigate to={ROUTES.TRAINING} />
    }

    if (!isLogged && isLoggedRoute) {
      return <Navigate to={ROUTES.ROOT} />
    }

    return children
  }, [children, isLogged, isLoggedRoute, isReady])

  return (
    <FirebaseContext.Provider
      value={{
        auth: {
          login,
          logout,
          isLogged,
          user,
        },
        database: {
          read: noop,
          write: writeOnDatabase,
        },
      }}
    >
      {renderContent()}
    </FirebaseContext.Provider>
  )
}

export function useAuth() {
  return useContext(FirebaseContext).auth
}

export function useDatabase() {
  return useContext(FirebaseContext).database
}
