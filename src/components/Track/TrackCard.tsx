import cn from 'classnames'
import { useTracks } from '../../contexts/TracksProvider'
import useTrackThumbnail from '../../hooks/useTrackThumbnail'
import { UserTrack } from '../../types/auth'
import { Track } from '../../types/track'
import LoopIcon from '../Icons/LoopIcon'
import RoundImage from '../UI/RoundImage'
import s from './TrackCard.module.css'

type TrackCardProps = {
  track: Track
  userTrack: UserTrack
  isActive?: boolean
}

export default function TrackCard({ track, userTrack, isActive }: TrackCardProps) {
  const { selectTrack } = useTracks()
  const thumbnail = useTrackThumbnail(track)
  const cardClassName = cn(s.card, s.info, {
    [s.cardIsActive]: isActive,
  })

  return (
    <li className={s.wrapper}>
      <button className={cardClassName} onClick={() => selectTrack(track)} type='button'>
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
