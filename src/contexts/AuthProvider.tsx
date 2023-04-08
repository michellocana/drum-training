import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'

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
import { AuthContextType, FullUser, ExtraData, ExtraDataValues } from '../types/auth'
import { useLocation, Navigate } from 'react-router-dom'
import { ROUTES, UNLOGGED_ROUTES } from '../constants/routes'
import { DatabaseEntities } from '../types/database'

const noop = async () => {}

const AuthContext = createContext<AuthContextType>({
  user: null,
  hasOptin: false,
  isLogged: false,
  login: noop,
  logout: noop,
})

export const app = initializeApp(FIREBASE_CONFIG)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<FullUser | null>(null)
  const [optin, setOptin] = useState<ExtraDataValues | null>(null)
  const db = useMemo(() => getFirestore(app), [])
  const auth = useMemo(() => getAuth(app), [])
  const location = useLocation()
  const isLogged = user !== null
  const isLoggedRoute = !UNLOGGED_ROUTES.includes(location.pathname)
  const hasOptin = !!optin

  const findExtraDataValue = (key: keyof ExtraDataValues, data: ExtraData[]) =>
    data.find((extraData) => extraData.type === key)?.value ?? ''

  const login = useCallback(
    async (email: string, password: string) => {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return user
    },
    [auth],
  )

  const logout = useCallback(async () => {
    await signOut(auth)
  }, [auth])

  const renderContent = useCallback(() => {
    if (!isReady) {
      // TODO: proper loader
      return 'Loading...'
    }

    if (isLogged && !isLoggedRoute && hasOptin) {
      return <Navigate to={ROUTES.TRAINING} />
    }

    if (isLogged && isLoggedRoute && !hasOptin) {
      return <Navigate to={ROUTES.ROOT} />
    }

    if (!isLogged && isLoggedRoute) {
      return <Navigate to={ROUTES.ROOT} />
    }

    return children
  }, [children, hasOptin, isLogged, isLoggedRoute, isReady])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const extraData = (await getDocs(
          collection(db, DatabaseEntities.Users, user.uid, DatabaseEntities.ExtraData),
        )) as QuerySnapshot<ExtraData>

        if (!extraData.empty) {
          const extraDataDocs = extraData.docs.map((value) => value.data())

          const optinData: ExtraDataValues = {
            firstName: findExtraDataValue('firstName', extraDataDocs),
            userName: findExtraDataValue('userName', extraDataDocs),
          }

          setOptin(optinData)
          setUser({ ...user, ...optinData })
        }
      } else {
        setOptin(null)
        setUser(user)
      }

      setIsReady(true)
    })

    return () => unsubscribe()
  }, [auth, db])

  useEffect(() => {
    if (!user) {
      return
    }

    const optinRef = collection(
      db,
      DatabaseEntities.Users,
      user.uid,
      DatabaseEntities.ExtraData,
    ) as CollectionReference<ExtraData>

    const unsubscribe = onSnapshot<ExtraData>(optinRef, (snapshot) => {
      if (!optin && !snapshot.empty) {
        const extraDataDocs = snapshot.docs.map((doc) => doc.data())

        const optinData: ExtraDataValues = {
          firstName: findExtraDataValue('firstName', extraDataDocs),
          userName: findExtraDataValue('userName', extraDataDocs),
        }

        setOptin(optinData)
        setUser({ ...user, ...optinData })
      }
    })

    return () => unsubscribe()
  }, [db, optin, user])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLogged,
        user,
        hasOptin,
      }}
    >
      {renderContent()}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
