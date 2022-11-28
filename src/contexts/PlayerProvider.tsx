import {
  createContext,
  createRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import YouTube from 'react-youtube'
import useMoment from '../hooks/useMoment'
import { PlaybackRate, PlayerContextType, VideoInfo, YoutubePlayer } from '../types/player'

export const PlayerContext = createContext<PlayerContextType>({
  startLoop: () => {},
  togglePlay: () => {},
  setPlaybackRate: () => {},
  setIsPlaying: () => {},
  setIsReady: () => {},
  isPlaying: false,
  isReady: false,
})

export const playerRef = createRef<YouTube>()

export default function PlayerProvider({ children }: PropsWithChildren) {
  const { currentMoment } = useMoment()
  const [currentVideoId] = useState('InFbBlpDTfQ')
  const [currentVideoInfo, setCurrentVideoInfo] = useState<VideoInfo>()
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const getInternalPlayer = useCallback(() => {
    return playerRef.current?.getInternalPlayer() as YoutubePlayer | undefined
  }, [])

  const startLoop = useCallback(() => {
    if (currentMoment) {
      const player = getInternalPlayer()
      player?.seekTo(currentMoment.start)
    }
  }, [currentMoment, getInternalPlayer])

  const setPlaybackRate = useCallback(
    (rate: PlaybackRate) => {
      const player = getInternalPlayer()
      player?.setPlaybackRate(Number(rate))
    },
    [getInternalPlayer],
  )

  const togglePlay = useCallback(() => {
    const player = getInternalPlayer()
    player?.[isPlaying ? 'pauseVideo' : 'playVideo']()
  }, [getInternalPlayer, isPlaying])

  useEffect(() => {
    if (isReady) {
      startLoop()
    }
  }, [isReady, startLoop])

  useEffect(() => {
    async function getInfo() {
      const player = getInternalPlayer()

      setCurrentVideoInfo({
        id: currentVideoId,
        duration: (await player?.getDuration()) ?? 0,
        thumb: `https://img.youtube.com/vi/${currentVideoId}/0.jpg`,
      })
    }

    if (isReady && currentVideoId) {
      getInfo()
    }
  }, [isReady, currentVideoId, getInternalPlayer])

  return (
    <PlayerContext.Provider
      value={{
        currentVideoId,
        currentVideoInfo,
        startLoop,
        setPlaybackRate,
        togglePlay,
        isReady,
        setIsReady,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
