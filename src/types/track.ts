import { UserTrack } from './auth'

export type TracksContextType = {
  addTrack(track: TrackData): Promise<void>
  updateTrack(track: Track): Promise<void>
  deleteTrack(track: Track): Promise<void>
  selectTrack(track: Track): void
  currentTrack?: Track
  isLoading: boolean
  tracks: Track[]
  userTracks: UserTrack[]
}

export type Track = {
  id: string
  name: string
  artist: string
  videoUrl: string
  userId: string
}

export type TrackData = Omit<Track, 'id'>
