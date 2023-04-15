import cn from 'classnames'
import useTrackThumbnail from '../../hooks/useTrackThumbnail'
import { Track } from '../../types/track'

import { UserTrack } from '../../types/auth'
import RoundImage from '../UI/RoundImage'
import s from './TrackCard.module.css'
import LoopIcon from '../Icons/LoopIcon'

type TrackCardProps = {
  track: Track
  userTrack: UserTrack
  isActive?: boolean
}

export function TrackCard({ track, userTrack, isActive }: TrackCardProps) {
  const thumbnail = useTrackThumbnail(track)
  const cardClassName = cn(s.card, s.info, {
    [s.cardIsActive]: isActive,
  })

  return (
    <li className={s.wrapper}>
      <button className={cardClassName} onClick={() => console.log('on track click')}>
        <RoundImage src={thumbnail} size='small' className={s.image} />
        <h3 className={s.name} title={track.name}>
          {track.name}
        </h3>
        <span className={s.artist} title={track.artist}>
          {track.artist}
        </span>
        <span className={s.loops} title={`Loop count: ${userTrack.loops}`}>
          <LoopIcon />
          {userTrack.loops}
        </span>
      </button>
    </li>
  )
}
