import { Moment } from './moment'

export type Track = {
  name: string
  artist: string
  videoUrl: string
  userId: string
  moments: Moment[]
}
