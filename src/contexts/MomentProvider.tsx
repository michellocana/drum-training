import { createContext, PropsWithChildren, useMemo, useState } from 'react'
import { Moment, MomentContextType } from '../types/moment'

export const MomentContext = createContext<MomentContextType>({
  moments: [],
  setCurrentMoment: () => {},
})

export default function MomentProvider({ children }: PropsWithChildren) {
  // TODO make this dynamic
  const [moments] = useState<Moment[]>([
    {
      name: 'Moment 1',
      start: 98,
      end: 108,
    },
    {
      name: 'Moment 1 extended',
      start: 88,
      end: 118,
    },
  ])
  const [currentMoment, setCurrentMoment] = useState(moments[0])

  const context = useMemo<MomentContextType>(
    () => ({
      moments,
      currentMoment,
      setCurrentMoment,
    }),
    [currentMoment, moments],
  )

  return <MomentContext.Provider value={context}>{children}</MomentContext.Provider>
}
