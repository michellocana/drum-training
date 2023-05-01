import {
  createContext,
  createRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react'
import YouTube from 'react-youtube'
import { PlaybackRate, PlayerContextType, TrackInfo, YoutubePlayer } from '../types/player'
import { useMoments } from './MomentsProvider'
import { useTracks } from './TracksProvider'
import { PLAYER_INFO_UPDATE_RATE } from '../constants/player'

export const PlayerContext = createContext<PlayerContextType>({
  startLoop: () => {},
  togglePlay: () => {},
  setPlaybackRate: () => {},
  setIsPlaying: () => {},
  setIsReady: () => {},
  setLoopStartTimestamp: () => {},
  isPlaying: false,
  isReady: false,
  loopStartTimestamp: 0,
})

export const playerRef = createRef<YouTube>()

export default function PlayerProvider({ children }: PropsWithChildren) {
  const { currentTrack } = useTracks()
  const { currentMoment } = useMoments()
  const [trackInfo, setTrackInfo] = useState<TrackInfo>()
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loopStartTimestamp, setLoopStartTimestamp] = useState(0)

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
    if (isReady && currentMoment) {
      startLoop()
    }
  }, [currentMoment, isReady, startLoop])

  // Current video info update
  useEffect(() => {
    async function getInfo() {
      const player = getInternalPlayer()

      setTrackInfo({
        time: (await player?.getCurrentTime()) ?? 0,
        duration: (await player?.getDuration()) ?? 0,
      })
    }

    if (isReady && currentTrack) {
      getInfo()
    }
  }, [isReady, getInternalPlayer, currentTrack])

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
          setTrackInfo((currentState) => {
            if (currentState) {
              return {
                ...currentState,
                time: currentTime,
              }
            }
          })
        }, PLAYER_INFO_UPDATE_RATE)
      }, timeToNextSecond)
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
        trackInfo,
        startLoop,
        setPlaybackRate,
        togglePlay,
        isReady,
        setIsReady,
        isPlaying,
        setIsPlaying,
        loopStartTimestamp,
        setLoopStartTimestamp,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerContext)
}
