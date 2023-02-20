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
import { FirebaseContextType, FullUser, Optin } from '../types/firebase'
import { useLocation, Navigate } from 'react-router-dom'
import { ROUTES, UNLOGGED_ROUTES } from '../constants/routes'

const noop = async () => {}

const FirebaseContext = createContext<FirebaseContextType>({
  auth: {
    user: null,
    hasOptin: false,
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
  const [user, setUser] = useState<FullUser | null>(null)
  const [optin, setOptin] = useState<Optin>(null)
  const database = useMemo(() => firebaseDb.getDatabase(), [])
  const auth = useMemo(() => firebaseAuth.getAuth(), [])
  const location = useLocation()
  const isLogged = user !== null
  const isLoggedRoute = !UNLOGGED_ROUTES.includes(location.pathname)
  const hasOptin = !!optin

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

  const readFromDatabase = useCallback(
    async (path: string) => {
      const snapshot = await firebaseDb.get(firebaseDb.ref(database, path))

      if (snapshot.exists()) {
        return snapshot.val()
      }

      return null
    },
    [database],
  )

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

    console.log({ isLogged, isLoggedRoute, hasOptin })

    // isLogged true
    // isLoggedRoute false
    // hasOptin false

    if (isLogged && !isLoggedRoute && hasOptin) {
      return <Navigate to={ROUTES.TRAINING} />
    }

    if (!isLogged && isLoggedRoute) {
      return <Navigate to={ROUTES.ROOT} />
    }

    return children
  }, [children, hasOptin, isLogged, isLoggedRoute, isReady])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const optinData: Optin = await readFromDatabase(`users/${user.uid}/optin`)

        setIsReady(true)
        setOptin(optinData)
        setUser({ ...user, ...optinData })
      } else {
      setIsReady(true)
      setUser(user)
      }
    })

    return () => unsubscribe()
  }, [auth, readFromDatabase])

  useEffect(() => {
    if (!user) {
      return
    }

    const optinRef = firebaseDb.ref(database, `users/${user.uid}/optin`)
    const unsubscribe = firebaseDb.onValue(optinRef, (snapshot) => {
      setOptin(snapshot.val())
    })

    return () => unsubscribe()
  }, [database, user])

  return (
    <FirebaseContext.Provider
      value={{
        auth: {
          login,
          logout,
          isLogged,
          user,
          hasOptin,
        },
        database: {
          read: readFromDatabase,
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
