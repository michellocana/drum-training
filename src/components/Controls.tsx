import usePlayer from '../hooks/usePlayer'
import { PLAYBACK_RATES } from '../types/player'

export default function Controls() {
  const { setPlaybackRate, togglePlay, isPlaying } = usePlayer()

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
    </ul>
  )
}
