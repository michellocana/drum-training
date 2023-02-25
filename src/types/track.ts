export type TracksContextType = {
  addTrack(track: NewTrack): Promise<void>
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

export type NewTrack = Omit<Track, 'id'>
