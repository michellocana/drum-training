import YouTube from 'react-youtube'
import { playerRef } from '../contexts/PlayerProvider'
import useMoment from '../hooks/useMoment'
import usePlayer from '../hooks/usePlayer'

export default function Player() {
  const { startLoop, setIsReady, setIsPlaying } = usePlayer()
  const { currentMoment } = useMoment()

  return (
    <YouTube
      ref={playerRef}
      videoId='InFbBlpDTfQ'
      opts={{ playerVars: { end: currentMoment?.end, modestbranding: 1 } }}
      onReady={() => setIsReady(true)}
      onEnd={() => startLoop()}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  )
}
