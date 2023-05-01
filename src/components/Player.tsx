import YouTube from 'react-youtube'
import { useMoments } from '../contexts/MomentsProvider'
import { playerRef, usePlayer } from '../contexts/PlayerProvider'
import { useTracks } from '../contexts/TracksProvider'
import useYoutubeId from '../hooks/useYoutubeId'
import Controls from './Controls'

import s from './Player.module.css'

type PlayerProps = {
  className: string
}

export default function Player({ className }: PlayerProps) {
  const { currentTrack } = useTracks()
  const { currentMoment } = useMoments()
  const { startLoop, setIsReady, setIsPlaying, setLoopStartTimestamp } = usePlayer()
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
        onStateChange={(event) => {
          if (event.data === YouTube.PlayerState.PLAYING) {
            setLoopStartTimestamp(Date.now())
          }
        }}
        className={s.player}
      />

      <Controls />
    </div>
  )
}
