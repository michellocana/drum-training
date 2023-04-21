import cn from 'classnames'
import _ from 'lodash'
import { useRef } from 'react'
import LoopIcon from '../Icons/LoopIcon'
import SkeletonText from '../UI/SkeletonText'
import SkeletonRoundImage from './SkeletonRoundImage'
import s from './SkeletonTrackCard.module.css'

export default function SkeletonTrackCard() {
  const skeletonTrackName = useRef(''.padStart(_.random(10, 20), '8')).current
  const skeletonArtistName = useRef(''.padStart(_.random(5, 15), '8')).current
  const skeletonLoopsCount = useRef(''.padStart(_.random(1, 2), '8')).current

  return (
    <li className={s.wrapper}>
      <div className={cn(s.card, s.info)}>
        <SkeletonRoundImage size='small' className={s.image} />
        <SkeletonText
          text={skeletonTrackName}
          fontSize={13}
          lineHeight={1.25}
          className={s.skeletonName}
        />
        <SkeletonText
          text={skeletonArtistName}
          fontSize={9}
          lineHeight={1.33}
          className={s.skeletonArtist}
        />
        <span className={s.loops}>
          <LoopIcon />
          <SkeletonText text={skeletonLoopsCount} fontSize={12} lineHeight={1} />
        </span>
      </div>
    </li>
  )
}
