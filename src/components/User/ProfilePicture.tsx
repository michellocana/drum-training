import { useMemo } from 'react'
import { Md5 } from 'ts-md5'
import { useAuth } from '../../contexts/AuthProvider'

import s from './ProfilePicture.module.css'

export default function ProfilePicture() {
  const { user } = useAuth()
  const email = user?.email ?? ''
  const hash = useMemo(() => Md5.hashStr(email), [email])
  const img = `https://www.gravatar.com/avatar/${hash}`

  if (!user) {
    return null
  }

  return <img src={img} alt='' className={s.container} width={80} height={80} />
}
