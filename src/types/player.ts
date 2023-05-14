import { Dispatch, SetStateAction } from 'react'
import { Moment } from './moment'

export type PlayerContextType = {
  startLoop(moment: Moment): void
  togglePlay(): void
  setPlaybackRate(rate: PlaybackRate): void
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  setIsReady: Dispatch<SetStateAction<boolean>>
  setLoopStartTimestamp: Dispatch<SetStateAction<number>>
  isPlaying: boolean
  isReady: boolean
  playbackRate: PlaybackRate
  loopStartTimestamp: number
  trackInfo?: TrackInfo
}

export type YoutubePlayer = {
  seekTo(time: number): Promise<void>
  setPlaybackRate(rate: number): Promise<void>
  playVideo(): Promise<void>
  pauseVideo(): Promise<void>
  getDuration(): Promise<number>
  getCurrentTime(): Promise<number>
  addEventListener(event: string, listener: (event: { data: unknown }) => void): void
}

export type TrackInfo = {
  time: number
  duration: number
}

export const PLAYBACK_RATES = ['0.25', '0.5', '0.75', '1'] as const
export type PlaybackRate = typeof PLAYBACK_RATES[number]
