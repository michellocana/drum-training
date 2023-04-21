import { useCallback, useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { useTracks } from '../../contexts/TracksProvider'
import IconButton from '../UI/IconButton'
import TrackCard from './TrackCard'
import s from './TrackList.module.css'
import MenuUserInfo from '../Menu/MenuUserInfo'
import useIsMobile from '../../hooks/useIsMobile'
import SkeletonTrackCard from '../Skeleton/SkeletonTrackCard'
import TrackForm from './TrackForm'

export default function TrackList() {
  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const { user } = useAuth()
  const { addTrack, isLoading: isLoadingTracks, tracks, userTracks, currentTrack } = useTracks()
  const isMobile = useIsMobile()

  const renderAddTrackButton = useCallback(() => {
    if (!isAddingTrack) {
      return <IconButton icon='plus' onClick={() => setIsAddingTrack(true)} />
    }

    return null
  }, [isAddingTrack])

  const renderTopContent = useCallback(() => {
    if (isMobile) {
      return <MenuUserInfo>{renderAddTrackButton()}</MenuUserInfo>
    }

    return <h2 className={s.title}>Your tracks</h2>
  }, [isMobile, renderAddTrackButton])

  const renderAddTrackForm = useCallback(() => {
    if (isAddingTrack) {
      return (
        <TrackForm
          onSubmit={async (values) => {
            const userId = user?.uid ?? ''
            await addTrack({ ...values, userId: userId })
            setIsAddingTrack(false)
          }}
          onCancel={() => setIsAddingTrack(false)}
        />
      )
    }

    return null
  }, [addTrack, isAddingTrack, user?.uid])

  const renderTrackList = useCallback(() => {
    return (
      <ul className={s.trackList}>
        {isLoadingTracks
          ? Array.from({ length: 4 }).map((_, index) => <SkeletonTrackCard key={index} />)
          : userTracks.map((userTrack) => {
              const track = tracks.find((track) => track.id === userTrack.trackId)
              const isCurrentTrack = currentTrack?.id === track?.id

              return (
                track && (
                  <TrackCard
                    key={track.id}
                    userTrack={userTrack}
                    track={track}
                    isActive={isCurrentTrack}
                  />
                )
              )
            })}
      </ul>
    )
  }, [currentTrack, isLoadingTracks, tracks, userTracks])

  return (
    <div className={s.wrapper}>
      {renderTopContent()}
      {!isMobile && renderAddTrackButton()}
      {renderAddTrackForm()}
      {renderTrackList()}
    </div>
  )
}
