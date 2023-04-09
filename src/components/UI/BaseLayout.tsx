import { ReactElement } from 'react'
import Menu from '../Menu/Menu'

import s from './BaseLayout.module.css'
import { useAuth } from '../../contexts/AuthProvider'

type BaseLayoutProps = {
  children: ReactElement
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const { isLogged } = useAuth()

  if (!isLogged) {
    return children
  }

  return (
    <div className={s.wrapper}>
      <Menu />
      <main>{children}</main>
    </div>
  )
}
