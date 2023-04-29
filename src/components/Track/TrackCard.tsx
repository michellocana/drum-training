import cn from 'classnames'
import { useCallback, useState } from 'react'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'
import { useTracks } from '../../contexts/TracksProvider'
import { useHasFocus } from '../../hooks/useHasFocus'
import useTrackThumbnail from '../../hooks/useTrackThumbnail'
import { UserTrack } from '../../types/auth'
import { Track } from '../../types/track'
import LoopIcon from '../Icons/LoopIcon'
import IconButton from '../UI/IconButton'
import RoundImage from '../UI/RoundImage'
import s from './TrackCard.module.css'
import TrackForm from './TrackForm'

type TrackCardProps = {
  track: Track
  userTrack: UserTrack
  isActive?: boolean
}

export default function TrackCard({ track, userTrack, isActive }: TrackCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isInDeleteProcess, setIsInDeleteProcess] = useState(false)
  const [isInEditProcess, setIsInEditProcess] = useState(false)
  const { selectTrack, deleteTrack, updateTrack } = useTracks()
  const thumbnail = useTrackThumbnail(track)
  const [hasFocus, setHasFocus, ref] = useHasFocus<HTMLLIElement>()

  const renderActions = useCallback(() => {
    if (isInDeleteProcess) {
      return (
        <div className={s.deleteAction}>
          <IconButton
            size='small'
            theme='white'
            icon='cancel'
            onClick={() => setIsInDeleteProcess(false)}
          />

          <IconButton
            size='small'
            icon='check'
            isLoading={isDeleting}
            onClick={async () => {
              setIsDeleting(true)
              await deleteTrack(track)
              setIsDeleting(false)
              setIsInDeleteProcess(false)
            }}
          />
        </div>
      )
    }

    return (
      <div className={s.actions}>
        <button className={s.action} title='Edit track' onClick={() => setIsInEditProcess(true)}>
          <img src={editIcon} alt='' className={s.actionIcon} />
        </button>
        <button
          className={s.action}
          title='Delete track'
          onClick={() => setIsInDeleteProcess(true)}
        >
          <img src={trashIcon} alt='' className={s.actionIcon} />
        </button>
      </div>
    )
  }, [deleteTrack, isDeleting, isInDeleteProcess, track])

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
}
