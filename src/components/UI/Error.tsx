import { PropsWithChildren } from 'react'

import errorIcon from '../../assets/icons/error.svg'

import s from './Error.module.css'

type ErrorProps = PropsWithChildren<{}>

export default function Error({ children }: ErrorProps) {
  return (
    <div className={s.error}>
      <img src={errorIcon} alt='' />
      {children}
    </div>
  )
}
