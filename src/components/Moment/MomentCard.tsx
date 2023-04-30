import cn from 'classnames'
import { useState } from 'react'
import useDurationLabel from '../../hooks/useDurationLabel'
import { Moment } from '../../types/moment'
import { CardActions } from '../UI/CardActions'
import s from './MomentCard.module.css'
import MomentForm from './MomentForm'
import { useHasFocus } from '../../hooks/useHasFocus'
import { useMoments } from '../../contexts/MomentsProvider'

type MomentCardProps = {
  moment: Moment
  isActive: boolean
}

export default function MomentCard({ moment, isActive }: MomentCardProps) {
  // const { loopStartTimestamp } = usePlayer()
  const { selectMoment, updateMoment, deleteMoment } = useMoments()
  const [hasFocus, setHasFocus, ref] = useHasFocus<HTMLLIElement>()
  const start = useDurationLabel(moment.start)
  const end = useDurationLabel(moment.end)

  // useEffect(() => {
  //   if (isCurrentMoment) {
  //     console.log('loop start', loopStartTimestamp)
  //   }
  // }, [isCurrentMoment, loopStartTimestamp])

  return (
    <CardActions actionsClassName={s.actions} onDelete={() => deleteMoment(moment)}>
      {({ isInEditProcess, setIsInEditProcess, isInDeleteProcess, renderActions }) => {
        if (isInEditProcess) {
          return (
            <li className={s.wrapper}>
              <MomentForm
                initialValues={moment}
                onCancel={() => setIsInEditProcess(false)}
                onSubmit={async (values) => {
                  await updateMoment({ ...moment, ...values })
                  setIsInEditProcess(false)
                  setHasFocus(false)
                  ref.current?.parentElement?.focus()
                }}
              />
            </li>
          )
        }

        return (
          <li className={cn(s.wrapper, { [s.wrapperHasFocus]: hasFocus })} ref={ref}>
            <button className={s.card} onClick={() => selectMoment(moment)} type='button'>
              <h3 className={s.name} title={moment.name}>
                {isInDeleteProcess ? 'Are you sure?' : moment.name}
              </h3>

              {!isInDeleteProcess && (
                <small className={s.duration}>
                  {start} - {end}
                </small>
              )}
            </button>

            {renderActions()}
          </li>
        )
      }}
    </CardActions>
  )
}
