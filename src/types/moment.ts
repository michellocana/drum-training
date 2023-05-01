export type Moment = {
  id: string
  name: string
  start: number
  end: number
  trackId: string
}

export type MomentData = Omit<Moment, 'id'>

export type MomentContextType = {
  addMoment(moment: Omit<MomentData, 'trackId'>): Promise<void>
  updateMoment(moment: Moment): Promise<void>
  deleteMoment(moment: Moment): Promise<void>
  selectMoment(moment: Moment): void
  moments?: Moment[]
  currentMoment?: Moment | null
  isLoading: boolean
}
