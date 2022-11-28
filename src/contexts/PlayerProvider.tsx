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

  // Initial loop control
  useEffect(() => {
    if (isReady) {
      startLoop()
    }
  }, [isReady, startLoop])

  // Current video info update
  useEffect(() => {
    async function getInfo() {
      const player = getInternalPlayer()

      setCurrentVideoInfo({
        id: currentVideoId,
        time: (await player?.getCurrentTime()) ?? 0,
        duration: (await player?.getDuration()) ?? 0,
        thumb: `https://img.youtube.com/vi/${currentVideoId}/0.jpg`,
      })
    }

    if (isReady && currentVideoId) {
      getInfo()
    }
  }, [isReady, currentVideoId, getInternalPlayer])

  // Time update
  useEffect(() => {
    let timeoutId: number
    let intervalId: number

    async function updateTime() {
      const player = getInternalPlayer()
      const currentTime = await player?.getCurrentTime()

      if (!currentTime) {
        return
      }

      // Waiting for next second so the actual player and our state get as in sync as possible
      const timeToNextSecond = (currentTime - Math.round(currentTime)) * 1000

      setTimeout(() => {
        intervalId = window.setInterval(async () => {
          const currentTime = (await player?.getCurrentTime()) ?? 0
          setCurrentVideoInfo((currentState) => {
            if (currentState) {
              return {
                ...currentState,
                time: currentTime,
              }
            }
          })
        }, 1000)
      }, timeToNextSecond)

      console.log()
    }

    function unsubscribe() {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      if (intervalId) {
        clearInterval(intervalId)
      }
    }

    if (isPlaying) {
      updateTime()
      return () => unsubscribe()
    }
  }, [getInternalPlayer, isPlaying])

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
