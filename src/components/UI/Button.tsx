import { PropsWithChildren } from 'react'
import cn from 'classnames'

import s from './Button.module.css'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    isLoading?: boolean
    theme?: 'default' | 'white'
  }>

export default function Button({
  children,
  isLoading,
  disabled,
  className,
  theme = 'default',
  ...otherProps
}: ButtonProps) {
  const buttonClassName = cn(s.button, className, {
    [s.buttonIsWhite]: theme === 'white',
  })

  return (
    <button className={buttonClassName} disabled={disabled || isLoading} {...otherProps}>
      {isLoading && <div className={s.spinner} />}
      {children}
    </button>
  )
}
