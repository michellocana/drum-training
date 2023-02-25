import { Moment } from './moment'

export type TracksContextType = {
  fetchTracks(): Promise<void>
  tracks: Track[]
  isLoading: boolean
}

export type Track = {
  name: string
  artist: string
  videoUrl: string
  userId: string
  moments: Moment[]
}
