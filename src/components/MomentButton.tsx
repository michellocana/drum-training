import useMoment from '../hooks/useMoment'
import useDurationLabel from '../hooks/useDurationLabel'
import usePlayer from '../hooks/usePlayer'
import { Moment } from '../types/moment'

type MomentButtonProps = {
  moment: Moment
}

export default function MomentButton({ moment }: MomentButtonProps) {
  const { startLoop } = usePlayer()
  const { setCurrentMoment } = useMoment()
  const momentStartLabel = useDurationLabel(moment.start)
  const momentEndLabel = useDurationLabel(moment.end)

  return (
    <button
      onClick={() => {
        setCurrentMoment(moment)
        startLoop()
      }}
    >
      {moment.name} / {momentStartLabel}/{momentEndLabel}
    </button>
  )
}
