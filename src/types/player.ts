import { Dispatch, SetStateAction } from 'react'

export type PlayerContextType = {
  startLoop(): void
  togglePlay(): void
  setPlaybackRate(rate: PlaybackRate): void
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  setIsReady: Dispatch<SetStateAction<boolean>>
  isPlaying: boolean
  isReady: boolean
}

export type YoutubePlayer = {
  seekTo(time: number): void
  setPlaybackRate(rate: number): void
  playVideo(): void
  pauseVideo(): void
}

export const PLAYBACK_RATES = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2'] as const
export type PlaybackRate = typeof PLAYBACK_RATES[number]
