import { Moment } from '../../types/moment'
import MomentForm from './MomentForm'

type MomentCardProps = {
  moment: Moment
}

export default function MomentCard({ moment }: MomentCardProps) {
  // TODO show moment info and finish edit form
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
