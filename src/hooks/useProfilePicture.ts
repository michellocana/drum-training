import { useMemo } from 'react'
import { Md5 } from 'ts-md5'
import { useAuth } from '../contexts/AuthProvider'

export default function useProfilePicture() {
  const { user } = useAuth()
  const email = user?.email ?? ''
  const hash = useMemo(() => Md5.hashStr(email), [email])
  return user ? `https://www.gravatar.com/avatar/${hash}` : ''
}
