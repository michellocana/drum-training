import { PropsWithChildren } from 'react'
import cn from 'classnames'

import s from './Button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    isLoading?: boolean
  }>

export default function Button({ children, isLoading, disabled, ...otherProps }: ButtonProps) {
  return (
    <button
      className={cn(s.button, { [s.buttonIsLoading]: isLoading })}
      disabled={disabled || isLoading}
      {...otherProps}
    >
      {isLoading && <div className={s.spinner} />}
      {children}
    </button>
  )
}
