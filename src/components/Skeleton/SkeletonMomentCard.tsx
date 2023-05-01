import SkeletonText from '../UI/SkeletonText'
import s from './SkeletonMomentCard.module.css'

export default function SkeletonMomentCard() {
  return (
    <li className={s.wrapper}>
      <div className={s.card} role='presentation'>
        <SkeletonText className={s.name} text='Moment name' fontSize={14} lineHeight={1} />
        <SkeletonText className={s.duration} text='00:00 - 00:00' fontSize={12} lineHeight={0.9} />
      </div>
    </li>
  )
}
