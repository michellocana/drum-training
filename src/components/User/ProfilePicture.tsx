import { useMemo } from 'react'
import { Md5 } from 'ts-md5'
import { useAuth } from '../../contexts/FirebaseProvider'

export default function ProfilePicture() {
  const { user } = useAuth()
  const email = user?.email ?? ''
  const hash = useMemo(() => Md5.hashStr(email), [email])

  if (!user) {
    return null
  }

  return (
    <a
      href={`https://www.gravatar.com/avatar/${hash}`}
      target='_blank'
      rel='noreferrer noopener'
      style={{ color: 'white' }}
    >
      https://www.gravatar.com/avatar/{hash}
    </a>
  )
}
