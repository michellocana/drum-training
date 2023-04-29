import { useState } from 'react'
import useDurationLabel from '../../hooks/useDurationLabel'
import { Moment } from '../../types/moment'
import MomentForm from './MomentForm'

import s from './MomentCard.module.css'

type MomentCardProps = {
  moment: Moment
}

export default function MomentCard({ moment }: MomentCardProps) {
  // const { loopStartTimestamp } = usePlayer()
  // const { currentMoment } = useMoments()
  const [isEditingMoment /* , setIsEditingMoment */] = useState(false)
  // const isCurrentMoment = currentMoment?.id === moment.id
  const start = useDurationLabel(moment.start)
  const end = useDurationLabel(moment.end)

  // useEffect(() => {
  //   if (isCurrentMoment) {
  //     console.log('loop start', loopStartTimestamp)
  //   }
  // }, [isCurrentMoment, loopStartTimestamp])

  // TODO show moment info and finish edit form
  if (isEditingMoment) {
    return (
      <MomentForm
        onCancel={() => {
          console.log('cancel')
        }}
        onSubmit={() => {
          console.log('submit')
        }}
      />
    )
  }

  return (
    <li className={s.card}>
      {moment.name}

      <small className={s.duration}>
        {start} - {end}
      </small>
    </li>
  )
}
