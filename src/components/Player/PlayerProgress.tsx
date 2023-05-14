import { motion } from 'framer-motion'
import { useEffect } from 'react'
import cn from 'classnames'
import { useMoments } from '../../contexts/MomentsProvider'
import { usePlayer } from '../../contexts/PlayerProvider'

import { Moment } from '../../types/moment'
import { useProgressAnimation } from '../Moment/MomentCard'
import s from './PlayerProgress.module.css'

export default function PlayerProgress() {
  const { moments, selectMoment, currentMoment } = useMoments()
  const { trackInfo, loopStartTimestamp } = usePlayer()
  const [animation, resetAnimation] = useProgressAnimation({
    isActive: !!trackInfo?.duration,
    property: 'left',
    progress() {
      if (trackInfo) {
        const x = (trackInfo.time * 100) / trackInfo.duration
        return x
      }

      return 0
    },
  })

  useEffect(() => {
    resetAnimation()
  }, [resetAnimation, loopStartTimestamp])

  return (
    <div className={s.container}>
      {moments
        ?.sort((momentA, momentB) => momentA.start - momentB.start)
        .map((moment: Moment) => {
          if (trackInfo?.duration) {
            const progressPercentage = (moment.start * 100) / trackInfo.duration
            const lengthPercentage = ((moment.end - moment.start) * 100) / trackInfo.duration
            return (
              <button
                style={{
                  left: `${progressPercentage}%`,
                  width: `${lengthPercentage}%`,
                }}
                key={moment.id}
                className={cn(s.moment, { [s.momentIsActive]: moment.id === currentMoment?.id })}
                onClick={() => selectMoment(moment)}
              />
            )
          }

          return null
        })}

      <motion.div animate={animation} className={s.progress} />
    </div>
  )
}
