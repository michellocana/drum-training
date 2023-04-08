import { useMoments } from '../contexts/MomentsProvider'
import usePlayer from '../hooks/usePlayer'
import { Moment } from '../types/moment'
import Button from './UI/Button'

type MomentButtonProps = {
  moment: Moment
}

export default function MomentButton({ moment }: MomentButtonProps) {
  const { startLoop } = usePlayer()
  const { selectMoment, currentMoment } = useMoments()
  const isCurrentMoment = currentMoment?.id === moment.id

  return (
    <Button
      disabled={isCurrentMoment}
      onClick={() => {
        selectMoment(moment)
        startLoop()
      }}
    >
      Select
    </Button>
  )
}
