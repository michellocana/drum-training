import { useEffect } from 'react'
import YouTube from 'react-youtube'
import { useMoments } from '../../contexts/MomentsProvider'
import { playerRef, usePlayer } from '../../contexts/PlayerProvider'
import s from './PlayerVideo.module.css'

type PlayerVideoProps = {
  videoId: string
}

export default function PlayerVideo({ videoId }: PlayerVideoProps) {
  const { currentMoment } = useMoments()
  const { startLoop, setIsReady, setIsPlaying, setLoopStartTimestamp, trackInfo } = usePlayer()

  useEffect(() => {
    const currentTime = trackInfo?.time ?? 0

    if (currentMoment && currentTime > Number(currentMoment?.end)) {
      startLoop(currentMoment)
    }
  }, [currentMoment, startLoop, trackInfo])

  return (
    <YouTube
      ref={playerRef}
      videoId={videoId}
      opts={{ playerVars: { modestbranding: 1 } }}
      onReady={() => setIsReady(true)}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onStateChange={(event) => {
        if (event.data === YouTube.PlayerState.PLAYING) {
          setLoopStartTimestamp(Date.now())
        }
      }}
      className={s.player}
    />
  )
}
