import useTrackThumbnail from '../../hooks/useTrackThumbnail'
import { Track } from '../../types/track'

type TrackThumbnailProps = {
  track: Track
}

export default function TrackThumbnail({ track }: TrackThumbnailProps) {
  const thumbnail = useTrackThumbnail(track)

  return (
    <div style={{ padding: '8px 8px 0' }}>
      <img src={thumbnail} alt='' height={50} style={{ verticalAlign: 'top' }} />
    </div>
  )
}
