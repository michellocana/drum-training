import { useDurationLabel } from '../hooks/useDurationLabel'
import usePlayer from '../hooks/usePlayer'
import { PLAYBACK_RATES } from '../types/player'

export default function Controls() {
  const { setPlaybackRate, togglePlay, isPlaying, currentVideoInfo } = usePlayer()
  const currentDuration = useDurationLabel(currentVideoInfo?.time ?? 0)
  const totalDuration = useDurationLabel(currentVideoInfo?.duration ?? 0)

  return (
    <ul>
      <li>
        <button onClick={() => togglePlay()}>{isPlaying ? 'Pause' : 'Play'}</button>
        {PLAYBACK_RATES.map((rate) => (
          <button key={rate} onClick={() => setPlaybackRate(rate)}>
            {rate}x
          </button>
        ))}
      </li>
      <li>
        {currentDuration} / {totalDuration}
      </li>
    </ul>
  )
}
