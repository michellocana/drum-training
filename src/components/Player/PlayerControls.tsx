import cn from 'classnames'
import { SVGAttributes, useCallback } from 'react'
import { usePlayer } from '../../contexts/PlayerProvider'
import { PLAYBACK_RATES, PlaybackRate } from '../../types/player'

import s from './PlayerControls.module.css'
import LoopIcon from '../Icons/LoopIcon'
import PauseIcon from '../Icons/PauseIcon'
import PlayIcon from '../Icons/PlayIcon'
import BackwardIcon from '../Icons/BackwardIcon'

export default function PlayerControls() {
  const { setPlaybackRate, togglePlay, isPlaying, playbackRate } = usePlayer()

  const renderActionButton = useCallback(
    ({
      Icon,
      onClick,
    }: {
      Icon(props: SVGAttributes<SVGElement>): JSX.Element
      onClick(): void
    }) => {
      return (
        <button onClick={onClick} className={s.actionButton}>
          <Icon className={s.actionIcon} />
        </button>
      )
    },
    [],
  )

  const renderPlaybackRateButton = useCallback(
    (rate: PlaybackRate) => {
      return (
        <button
          onClick={() => setPlaybackRate(rate)}
          className={cn(s.playbackRate, { [s.playbackRateIsActive]: playbackRate === rate })}
        >
          {rate}x
        </button>
      )
    },
    [playbackRate, setPlaybackRate],
  )

  return (
    <ul className={s.container}>
      <li>
        {renderActionButton({
          Icon: BackwardIcon,
          onClick: () => console.log('backward'),
        })}
      </li>

      <li>
        {renderActionButton({
          Icon: isPlaying ? PauseIcon : PlayIcon,
          onClick: () => togglePlay(),
        })}
      </li>

      <li>
        {renderActionButton({
          Icon: LoopIcon,
          onClick: () => console.log('loop'),
        })}
      </li>

      {PLAYBACK_RATES.map((rate) => (
        <li key={rate}>{renderPlaybackRateButton(rate)}</li>
      ))}
    </ul>
  )
}
