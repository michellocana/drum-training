import { useMemo } from 'react'
import { Md5 } from 'ts-md5'
import { useAuth } from '../../contexts/AuthProvider'

export default function ProfilePicture() {
  const { user } = useAuth()
  const email = user?.email ?? ''
  const hash = useMemo(() => Md5.hashStr(email), [email])
  const img = `https://www.gravatar.com/avatar/${hash}`

  if (!user) {
    return null
  }

  return (
    <a href={img} target='_blank' rel='noreferrer noopener' style={{ color: 'white' }}>
      <img src={img} alt='' height={30} style={{ verticalAlign: 'middle' }} /> Profile picture
    </a>
  )
}
