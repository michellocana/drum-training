import cn from 'classnames'

import Button from './Button'

import plusIcon from '../../assets/icons/plus.svg'

import s from './IconButton.module.css'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'tiny' | 'small'
  icon: 'plus'
}

const ICONS: Record<IconButtonProps['icon'], string> = {
  plus: plusIcon,
}

export default function IconButton({ size = 'tiny', icon, ...otherProps }: IconButtonProps) {
  const buttonClassName = cn(s.button, {
    [s.buttonIsTiny]: size === 'tiny',
    [s.buttonIsSmall]: size === 'small',
  })
  const iconClassName = cn({
    [s.plusIcon]: icon === 'plus',
  })

  return (
    <Button className={buttonClassName} {...otherProps}>
      <img src={ICONS[icon]} alt='' className={iconClassName} />
    </Button>
  )
}
