import { createContext, createRef, PropsWithChildren, useCallback, useMemo } from 'react'
import YouTube from 'react-youtube'
import useMoment from '../hooks/useMoment'
import { PlayerContextType } from '../types/player'

export const PlayerContext = createContext<PlayerContextType>({
  startLoop: () => {},
})

export const playerRef = createRef<YouTube>()

export default function PlayerProvider({ children }: PropsWithChildren) {
  const { currentMoment } = useMoment()

  const startLoop = useCallback(() => {
    if (currentMoment) {
      playerRef.current?.getInternalPlayer().seekTo(currentMoment.start)
    }
  }, [currentMoment])

  const context = useMemo<PlayerContextType>(() => ({ startLoop }), [startLoop])

  return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
}
