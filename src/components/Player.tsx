import YouTube from 'react-youtube'
import { useMoments } from '../contexts/MomentsProvider'
import { playerRef } from '../contexts/PlayerProvider'
import { useTracks } from '../contexts/TracksProvider'
import usePlayer from '../hooks/usePlayer'
import useYoutubeId from '../hooks/useYoutubeId'

export default function Player() {
  const { currentTrack } = useTracks()
  const { currentMoment } = useMoments()
  const { startLoop, setIsReady, setIsPlaying } = usePlayer()
  const videoId = useYoutubeId(currentTrack?.videoUrl)

  if (!videoId) {
    return <p>Select a song to continue.</p>
  }

  return (
    <YouTube
      ref={playerRef}
      videoId={videoId}
      opts={{ playerVars: { end: currentMoment?.end, modestbranding: 1 } }}
      onReady={() => setIsReady(true)}
      onEnd={() => startLoop()}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  )
}
