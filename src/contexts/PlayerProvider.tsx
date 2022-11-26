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
import { PlaybackRate, PlayerContextType, YoutubePlayer } from '../types/player'

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
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const getInternalPlayer = useCallback(() => {
    return playerRef.current?.getInternalPlayer() as YoutubePlayer | undefined
  }, [])

  const startLoop = useCallback(() => {
    if (currentMoment) {
      const youtubePlayer = getInternalPlayer()
      youtubePlayer?.seekTo(currentMoment.start)
    }
  }, [currentMoment, getInternalPlayer])

  const setPlaybackRate = useCallback(
    (rate: PlaybackRate) => {
      const youtubePlayer = getInternalPlayer()
      youtubePlayer?.setPlaybackRate(Number(rate))
    },
    [getInternalPlayer],
  )

  const togglePlay = useCallback(() => {
    const youtubePlayer = getInternalPlayer()
    youtubePlayer?.[isPlaying ? 'pauseVideo' : 'playVideo']()
  }, [getInternalPlayer, isPlaying])

  useEffect(() => {
    if (isReady) {
      startLoop()
    }
  }, [isReady, startLoop])

  return (
    <PlayerContext.Provider
      value={{
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
