import { useEffect } from 'react'
import cn from 'classnames'
import { useMoments } from '../../contexts/MomentsProvider'
import useDurationLabel from '../../hooks/useDurationLabel'
import useHasFocus from '../../hooks/useHasFocus'
import { Moment } from '../../types/moment'
import { CardActions } from '../UI/CardActions'
import s from './MomentCard.module.css'
import MomentForm from './MomentForm'
import { motion, useAnimation } from 'framer-motion'
import { usePlayer } from '../../contexts/PlayerProvider'
import { PLAYER_INFO_UPDATE_RATE } from '../../constants/player'

type MomentCardProps = {
  moment: Moment
  isActive: boolean
}

export default function MomentCard({ moment, isActive }: MomentCardProps) {
  const { startLoop, loopStartTimestamp, trackInfo } = usePlayer()
  const { selectMoment, updateMoment, deleteMoment } = useMoments()
  const [hasFocus, setHasFocus, ref] = useHasFocus<HTMLLIElement>()
  const start = useDurationLabel(moment.start)
  const end = useDurationLabel(moment.end)
  const animation = useAnimation()

  useEffect(() => {
    animation.set({ x: 0, transition: { duration: 0, ease: 'linear' } })
  }, [animation, loopStartTimestamp])

  useEffect(() => {
    if (isActive && trackInfo) {
      const loopDuration = moment.end - moment.start
      const loopProgress = trackInfo.time - moment.start
      const x = Math.min(100, (loopProgress * 100) / loopDuration)
      animation.start({
        x: x + '%',
        transition: { duration: PLAYER_INFO_UPDATE_RATE / 1000, ease: 'linear' },
      })

      return () => animation.stop()
    }
  }, [animation, isActive, moment, trackInfo])

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
                  const newMoment = { ...moment, ...values }
                  await updateMoment(newMoment)
                  selectMoment(newMoment)
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
            <button
              className={s.card}
              onClick={() => {
                selectMoment(moment)
                startLoop()
              }}
              type='button'
            >
              {isActive && (
                <motion.div
                  animate={animation}
                  className={cn(s.progress, { [s.progressIsHidden]: isInDeleteProcess })}
                />
              )}

              <h3 className={s.name} title={moment.name}>
                {isInDeleteProcess ? (
                  <>
                    Deleting "{moment.name}"
                    <br />
                    Are you sure?
                  </>
                ) : (
                  moment.name
                )}
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
