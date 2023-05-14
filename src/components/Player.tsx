import { useTracks } from '../contexts/TracksProvider'
import useYoutubeId from '../hooks/useYoutubeId'
import PlayerControls from './Player/PlayerControls'
import PlayerProgress from './Player/PlayerProgress'
import PlayerVideo from './Player/PlayerVideo'

type PlayerProps = {
  className: string
}

export default function Player({ className }: PlayerProps) {
  const { currentTrack } = useTracks()
  const videoId = useYoutubeId(currentTrack?.videoUrl)

  if (!videoId) {
    return null
  }

  return (
    <div className={className}>
      <PlayerVideo videoId={videoId} />
      <PlayerProgress />
      <PlayerControls />
    </div>
  )
}
