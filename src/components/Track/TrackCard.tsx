import cn from 'classnames'
import { useTracks } from '../../contexts/TracksProvider'
import { useHasFocus } from '../../hooks/useHasFocus'
import useTrackThumbnail from '../../hooks/useTrackThumbnail'
import { UserTrack } from '../../types/auth'
import { Track } from '../../types/track'
import LoopIcon from '../Icons/LoopIcon'
import { CardActions } from '../UI/CardActions'
import RoundImage from '../UI/RoundImage'
import s from './TrackCard.module.css'
import TrackForm from './TrackForm'

type TrackCardProps = {
  track: Track
  userTrack: UserTrack
  isActive?: boolean
}

export default function TrackCard({ track, userTrack, isActive }: TrackCardProps) {
  const { selectTrack, deleteTrack, updateTrack } = useTracks()
  const thumbnail = useTrackThumbnail(track)
  const [hasFocus, setHasFocus, ref] = useHasFocus<HTMLLIElement>()

  return (
    <CardActions actionsClassName={s.actions} onDelete={() => deleteTrack(track)}>
      {({ isInEditProcess, setIsInEditProcess, isInDeleteProcess, renderActions }) => {
        if (isInEditProcess) {
          return (
            <li className={cn(s.wrapper, s.form)}>
              <TrackForm
                initialValues={track}
                onCancel={() => setIsInEditProcess(false)}
                onSubmit={async (values) => {
                  await updateTrack({ ...track, ...values })
                  setIsInEditProcess(false)
                  setHasFocus(false)
                  ref.current?.parentElement?.focus()
                }}
              />
            </li>
          )
        }

        return (
          <li className={cn(s.wrapper, { [s.wrapperHasFocus]: hasFocus })} ref={ref}>
            <button
              className={cn(s.card, {
                [s.cardIsActive]: isActive,
                [s.cardIsDeleting]: isInDeleteProcess,
              })}
              onClick={() => selectTrack(track)}
              type='button'
            >
              <RoundImage src={thumbnail} size='small' className={s.image} />

              <h3 className={s.name} title={track.name}>
                {isInDeleteProcess ? 'Are you sure?' : track.name}
              </h3>

              {!isInDeleteProcess && (
                <>
                  <span className={s.artist} title={track.artist}>
                    {track.artist}
                  </span>

                  <span className={s.loops} title={`Loop count: ${userTrack.loops}`}>
                    <LoopIcon />
                    {userTrack.loops}
                  </span>
                </>
              )}
            </button>

            {renderActions()}
          </li>
        )
      }}
    </CardActions>
  )
}
