import { Dispatch, SetStateAction } from 'react'

export type Moment = {
  name: string
  start: number
  end: number
  trackId: string
}

export type MomentContextType = {
  moments: Moment[]
  currentMoment?: Moment
  setCurrentMoment: Dispatch<SetStateAction<Moment>>
}
