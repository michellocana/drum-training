import cn from 'classnames'
import { ReactElement, ReactNode, Children } from 'react'
import { Button, Item, Menu, MenuTrigger, Popover } from 'react-aria-components'

import actionIcon from '../../assets/icons/action.svg'

import s from './ActionMenu.module.css'
import RoundImage from './RoundImage'

type ActionMenuCommonProps = {
  className?: string
  children: ReactElement<ActionMenuItemProps> | ReactElement<ActionMenuItemProps>[]
}

type ActionMenuProps =
  | (ActionMenuCommonProps & {
      isProfilePicture?: false
    })
  | (ActionMenuCommonProps & {
      isProfilePicture: true
      src: string
    })

export default function ActionMenu({ className, children, ...props }: ActionMenuProps) {
  return (
    <MenuTrigger>
      <Button
        aria-label='Menu'
        className={cn(s.button, className, { [s.buttonIsProfilePicture]: props.isProfilePicture })}
      >
        {props.isProfilePicture ? (
          <RoundImage src={props.src} size='tiny' />
        ) : (
          <img src={actionIcon} alt='' />
        )}
      </Button>

      <Popover placement='bottom end'>
        <Menu
          className={s.menu}
          onAction={(key) => {
            const child = Children.map(children, (child) => child).find(
              (child) => child.props.id === key,
            )
            child?.props.onAction()
          }}
        >
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

type ActionMenuItemProps = {
  id: string
  children: ReactNode
  onAction(): void
}

ActionMenu.Item = function ({ id, children }: ActionMenuItemProps) {
  return (
    <Item key={id} id={id} className={s.menuItem}>
      {children}
    </Item>
  )
}
