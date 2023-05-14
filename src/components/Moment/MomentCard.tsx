import { useEffect, useCallback } from 'react'
import cn from 'classnames'
import { useMoments } from '../../contexts/MomentsProvider'
import useDurationLabel from '../../hooks/useDurationLabel'
import useHasFocus from '../../hooks/useHasFocus'
import { Moment } from '../../types/moment'
import { CardActions } from '../UI/CardActions'
import s from './MomentCard.module.css'
import MomentForm from './MomentForm'
import { AnimationControls, motion, useAnimation } from 'framer-motion'
import { usePlayer } from '../../contexts/PlayerProvider'
import { PLAYER_INFO_UPDATE_RATE } from '../../constants/player'

type MomentCardProps = {
  moment: Moment
  isActive: boolean
}

type UseProgressAnimationConfig = {
  /** Flag to tell if the animation is active currently */
  isActive: boolean

  /** Animation type (transform vs left CSS property) */
  property?: 'x' | 'left'

  /** Method that returns the current animation progress (a number from 0 to 100)  */
  progress(): number
}

export function useProgressAnimation({
  property = 'x',
  isActive,
  progress,
}: UseProgressAnimationConfig): [AnimationControls, () => void] {
  const animation = useAnimation()

  const resetAnimation = useCallback(() => {
    animation.set({ x: 0, transition: { duration: 0, ease: 'linear' } })
  }, [animation])

  useEffect(() => {
    if (isActive) {
      const progressNumber = progress() + '%'
      const transition = { duration: PLAYER_INFO_UPDATE_RATE / 1000, ease: 'linear' }

      if (property === 'left') {
        animation.start({
          [property]: progressNumber,
          transform: 'translate3d(0,0,0)', // prevent half pixel rendering
          transition: transition,
        })
      } else {
        animation.start({
          [property]: progressNumber,
          transition: transition,
        })
      }

      return () => animation.stop()
    }
  }, [animation, progress, isActive, property])

  return [animation, resetAnimation]
}

export default function MomentCard({ moment, isActive }: MomentCardProps) {
  const { startLoop, loopStartTimestamp, trackInfo } = usePlayer()
  const { selectMoment, updateMoment, deleteMoment } = useMoments()
  const [hasFocus, setHasFocus, ref] = useHasFocus<HTMLLIElement>()
  const start = useDurationLabel(moment.start)
  const end = useDurationLabel(moment.end)
  const trackCurrentTime = trackInfo?.time ?? 0

  const [animation, resetAnimation] = useProgressAnimation({
    isActive: isActive && !!trackInfo,
    progress() {
      const loopDuration = moment.end - moment.start
      const loopProgress = trackCurrentTime - moment.start
      const x = Math.min(100, (loopProgress * 100) / loopDuration)
      return x
    },
  })

  useEffect(() => {
    resetAnimation()
  }, [resetAnimation, loopStartTimestamp])

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
                if (isActive) {
                  selectMoment(null)
                } else {
                  selectMoment(moment)
                  startLoop(moment)
                }
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
