import { Dispatch, SetStateAction } from 'react'

export type Moment = {
  id: string
  name: string
  start: number
  end: number
  trackId: string
}

export type MomentData = Omit<Moment, 'id'>

export type MomentContextType = {
  moments: Moment[]
  currentMoment?: Moment
  setCurrentMoment: Dispatch<SetStateAction<Moment>>
}
