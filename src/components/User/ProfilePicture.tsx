import { useMemo } from 'react'
import { Md5 } from 'ts-md5'
import { useAuth } from '../../contexts/AuthProvider'
import RoundImage from '../UI/RoundImage'
import s from './ProfilePicture.module.css'

export default function ProfilePicture() {
  const { user } = useAuth()
  const email = user?.email ?? ''
  const hash = useMemo(() => Md5.hashStr(email), [email])
  const img = `https://www.gravatar.com/avatar/${hash}`

  if (!user) {
    return null
  }
  return <RoundImage src={img} className={s.container} size='large' />
}
