export type TracksContextType = {
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
