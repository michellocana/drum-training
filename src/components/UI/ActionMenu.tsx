import cn from 'classnames'
import { ReactElement, ReactNode, Children } from 'react'
import { Button, Item, Menu, MenuTrigger, Popover } from 'react-aria-components'

import actionIcon from '../../assets/icons/action.svg'

import s from './ActionMenu.module.css'

type ActionMenuProps = {
  className?: string
  children: ReactElement<ActionMenuItemProps> | ReactElement<ActionMenuItemProps>[]
}

export default function ActionMenu({ className, children }: ActionMenuProps) {
  return (
    <MenuTrigger>
      <Button aria-label='Menu' className={cn(s.button, className)}>
        <img src={actionIcon} alt='' />
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
