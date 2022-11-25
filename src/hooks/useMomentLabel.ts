import { useMemo } from 'react'

export function useMomentLabel(time: number) {
  return useMemo(() => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const normalizeTime = (time: number) => time.toString().padStart(2, '0')
    return `${normalizeTime(minutes)}:${normalizeTime(seconds)}`
  }, [time])
}
