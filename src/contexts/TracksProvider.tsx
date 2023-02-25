import { PropsWithChildren, useEffect } from 'react'
import { useAuth } from './AuthProvider'

export default function TracksProvider({ children }: PropsWithChildren) {
  const { user } = useAuth()

  useEffect(() => {
    console.log(user?.uid)
  }, [user])

  return <>{children}</>
}
