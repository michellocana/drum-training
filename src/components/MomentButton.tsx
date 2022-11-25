import useMoment from '../hooks/useMoment'
import { useMomentLabel } from '../hooks/useMomentLabel'
import usePlayer from '../hooks/usePlayer'
import { Moment } from '../types/moment'

type MomentButtonProps = {
  moment: Moment
}

export default function MomentButton({ moment }: MomentButtonProps) {
  const { startLoop } = usePlayer()
  const { setCurrentMoment } = useMoment()
  const momentStartLabel = useMomentLabel(moment.start)
  const momentEndLabel = useMomentLabel(moment.end)

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
