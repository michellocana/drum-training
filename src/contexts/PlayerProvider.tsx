import {
  createContext,
  createRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import YouTube from 'react-youtube'
import useMoment from '../hooks/useMoment'
import { PlayerContextType, YoutubePlayer } from '../types/player'

export const PlayerContext = createContext<PlayerContextType>({
  startLoop: () => {},
  isReady: false,
  setIsReady: () => {},
})

export const playerRef = createRef<YouTube>()

export default function PlayerProvider({ children }: PropsWithChildren) {
  const { currentMoment } = useMoment()
  const [isReady, setIsReady] = useState(false)

  const getYoutubePlayer = useCallback(() => {
    return playerRef.current?.getInternalPlayer() as YoutubePlayer | undefined
  }, [])

  const startLoop = useCallback(() => {
    if (currentMoment) {
      const youtubePlayer = getYoutubePlayer()
      youtubePlayer?.seekTo(currentMoment.start)
    }
  }, [currentMoment, getYoutubePlayer])

  useEffect(() => {
    if (isReady) {
      startLoop()
    }
  }, [isReady, startLoop])

  const context = useMemo<PlayerContextType>(
    () => ({ startLoop, isReady, setIsReady }),
    [isReady, startLoop],
  )

  return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
}
