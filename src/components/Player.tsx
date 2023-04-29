import YouTube from 'react-youtube'
import { useMoments } from '../contexts/MomentsProvider'
import { playerRef } from '../contexts/PlayerProvider'
import { useTracks } from '../contexts/TracksProvider'
import usePlayer from '../hooks/usePlayer'
import useYoutubeId from '../hooks/useYoutubeId'
import Controls from './Controls'

import s from './Player.module.css'

type PlayerProps = {
  className: string
}

export default function Player({ className }: PlayerProps) {
  const { currentTrack } = useTracks()
  const { currentMoment } = useMoments()
  const { startLoop, setIsReady, setIsPlaying } = usePlayer()
  const videoId = useYoutubeId(currentTrack?.videoUrl)

  if (!videoId) {
    return null
  }

  return (
    <div className={className}>
      <YouTube
        ref={playerRef}
        videoId={videoId}
        opts={{ playerVars: { end: currentMoment?.end, modestbranding: 1 } }}
        onReady={() => setIsReady(true)}
        onEnd={() => startLoop()}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={s.player}
      />

      <Controls />
    </div>
  )
}
