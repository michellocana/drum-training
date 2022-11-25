import { Dispatch, SetStateAction } from 'react'

export type PlayerContextType = {
  startLoop(): void
  isReady: boolean
  setIsReady: Dispatch<SetStateAction<boolean>>
}

export type YoutubePlayer = {
  seekTo(time: number): void
}
