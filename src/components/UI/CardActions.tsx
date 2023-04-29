import cn from 'classnames'
import s from './CardActions.module.css'
import IconButton from './IconButton'

import { Dispatch, ReactElement, SetStateAction, useCallback, useState } from 'react'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'

type CardActionsProps = {
  actionsClassName: string
  onDelete(): Promise<void>
  children(config: CardActionsConfig): ReactElement
}

type CardActionsConfig = {
  isInEditProcess: boolean
  setIsInEditProcess: Dispatch<SetStateAction<boolean>>
  isInDeleteProcess: boolean
  setIsInDeleteProcess: Dispatch<SetStateAction<boolean>>
  renderActions(): ReactElement
}

export function CardActions({ actionsClassName, onDelete, children }: CardActionsProps) {
  const [isInEditProcess, setIsInEditProcess] = useState(false)
  const [isInDeleteProcess, setIsInDeleteProcess] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const renderActions = useCallback(() => {
    if (isInDeleteProcess) {
      return (
        <div className={s.deleteAction}>
          <IconButton
            size='small'
            theme='white'
            icon='cancel'
            onClick={() => setIsInDeleteProcess(false)}
          />

          <IconButton
            size='small'
            icon='check'
            isLoading={isDeleting}
            onClick={async () => {
              setIsDeleting(true)
              await onDelete()
              setIsDeleting(false)
            }}
          />
        </div>
      )
    }

    return (
      <div className={cn(s.actions, actionsClassName)}>
        <button className={s.action} title='Edit track' onClick={() => setIsInEditProcess(true)}>
          <img src={editIcon} alt='' className={s.actionIcon} />
        </button>

        <button
          className={s.action}
          title='Delete track'
          onClick={() => setIsInDeleteProcess(true)}
        >
          <img src={trashIcon} alt='' className={s.actionIcon} />
        </button>
      </div>
    )
  }, [actionsClassName, isDeleting, isInDeleteProcess, onDelete])

  return children({
    isInDeleteProcess,
    isInEditProcess,
    setIsInDeleteProcess,
    setIsInEditProcess,
    renderActions,
  })
}
