import { useMemo } from 'react'

export function useDurationLabel(time: number) {
  return useMemo(() => {
    const roundedTime = Math.round(time)
    const minutes = Math.floor(roundedTime / 60)
    const seconds = roundedTime % 60
    const normalizeTime = (time: number) => time.toString().padStart(2, '0')
    return `${normalizeTime(minutes)}:${normalizeTime(seconds)}`
  }, [time])
}
