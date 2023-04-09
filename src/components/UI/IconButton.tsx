import cn from 'classnames'

import Button, { ButtonProps } from './Button'

import s from './IconButton.module.css'
import { useCallback } from 'react'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<ButtonProps> & {
    size?: 'tiny' | 'small'
    icon: 'plus' | 'check' | 'cancel'
  }

export default function IconButton({
  size = 'tiny',
  icon,
  isLoading,
  ...otherProps
}: IconButtonProps) {
  const buttonClassName = cn(s.button, {
    [s.buttonIsTiny]: size === 'tiny',
    [s.buttonIsSmall]: size === 'small',
  })
  const iconClassName = cn({
    [s.plusIcon]: icon === 'plus',
    [s.checkIcon]: icon === 'check',
    [s.cancelIcon]: icon === 'cancel',
  })

  const renderIcon = useCallback(() => {
    switch (icon) {
      case 'plus':
        return (
          <svg className={iconClassName} viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M14 8V6L8 6L8 0L6 0L6 6L0 6V8L6 8V14H8L8 8L14 8Z'
              fill='currentColor'
            />
          </svg>
        )

      case 'check':
        return (
          <svg className={iconClassName} viewBox='0 0 16 12' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.6653 0.334734C16.1116 0.781046 16.1116 1.50466 15.6653 1.95098L6.52241 11.0938C6.30808 11.3082 6.01739 11.4286 5.71429 11.4286C5.41118 11.4286 5.12049 11.3082 4.90616 11.0938L0.334735 6.52242C-0.111578 6.0761 -0.111578 5.35249 0.334735 4.90617C0.781049 4.45986 1.50467 4.45986 1.95098 4.90617L5.71428 8.66947L14.049 0.334735C14.4953 -0.111578 15.219 -0.111579 15.6653 0.334734Z'
              fill='currentColor'
            />
          </svg>
        )
      case 'cancel':
        return (
          <svg className={iconClassName} viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M13.364 2.05026L11.9497 0.636042L7 5.58579L2.05025 0.636042L0.636039 2.05026L5.58579 7L0.636039 11.9498L2.05025 13.364L7 8.41422L11.9497 13.364L13.364 11.9498L8.41421 7L13.364 2.05026Z'
              fill='currentColor'
            />
          </svg>
        )
    }
  }, [icon, iconClassName])

  return (
    <Button className={buttonClassName} isLoading={isLoading} {...otherProps}>
      {!isLoading && renderIcon()}
    </Button>
  )
}
