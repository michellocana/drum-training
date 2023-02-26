export type TracksContextType = {
  addTrack(track: TrackData): Promise<void>
  tracks: Track[]
  isLoading: boolean
}

export type Track = {
  id: string
  name: string
  artist: string
  videoUrl: string
  userId: string
}

export type TrackData = Omit<Track, 'id'>
