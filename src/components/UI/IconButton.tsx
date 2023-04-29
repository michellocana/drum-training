import cn from 'classnames'

import Button, { ButtonProps } from './Button'

import s from './IconButton.module.css'
import { useCallback } from 'react'
import PlusIcon from '../Icons/PlusIcon'
import CheckIcon from '../Icons/CheckIcon'
import CancelIcon from '../Icons/CancelIcon'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<ButtonProps> & {
    size?: 'tiny' | 'small'
    icon: 'plus' | 'check' | 'cancel'
  }

export default function IconButton({
  size = 'tiny',
  icon,
  isLoading,
  className,
  ...otherProps
}: IconButtonProps) {
  const buttonClassName = cn(s.button, className, {
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
        return <PlusIcon className={iconClassName} />

      case 'check':
        return <CheckIcon className={iconClassName} />

      case 'cancel':
        return <CancelIcon className={iconClassName} />
    }
  }, [icon, iconClassName])

  return (
    <Button className={buttonClassName} isLoading={isLoading} {...otherProps}>
      {!isLoading && renderIcon()}
    </Button>
  )
}
