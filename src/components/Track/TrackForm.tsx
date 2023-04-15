import { Form, Formik } from 'formik'
import { useCallback, useState } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { useTracks } from '../../contexts/TracksProvider'
import { TrackSchema } from '../../types/schema'
import IconButton from '../UI/IconButton'
import Input from '../UI/Input'
import TrackCard from './TrackCard'
import s from './TrackForm.module.css'

export default function TrackForm() {
  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const { user } = useAuth()
  const { addTrack, isLoading: isLoadingTracks, tracks, userTracks } = useTracks()

  const renderAddTrackButton = useCallback(() => {
    if (!isAddingTrack) {
      return <IconButton icon='plus' onClick={() => setIsAddingTrack(true)} />
    }

    return null
  }, [isAddingTrack])

  const renderAddTrackForm = useCallback(() => {
    if (isAddingTrack) {
      return (
        <Formik
          validationSchema={TrackSchema}
          initialValues={{ name: '', artist: '', videoUrl: '' }}
          onSubmit={async (values) => {
            const userId = user?.uid ?? ''
            await addTrack({ ...values, userId: userId })
            setIsAddingTrack(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <Input name='name' placeholder='Track Name' />
              <Input name='artist' placeholder='Artist' />
              <div className={s.submitWrapper}>
                <Input name='videoUrl' placeholder='YouTube Video URL' />
                <IconButton
                  icon='cancel'
                  size='small'
                  type='button'
                  theme='white'
                  onClick={() => setIsAddingTrack(false)}
                />
                <IconButton icon='check' size='small' type='submit' isLoading={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      )
    }

    return null
  }, [addTrack, isAddingTrack, user?.uid])

  const renderTrackList = useCallback(() => {
    return (
      <ul className={s.trackList}>
        {isLoadingTracks ? (
          <TrackCard
            userTrack={{
              trackId: '1',
              loops: 20,
              userId: '1',
            }}
            track={{
              id: '1',
              artist: 'Thundercat',
              name: 'Them Changes',
              userId: '1',
              videoUrl: 'https://www.youtube.com/watch?v=GNCd_ERZvZM',
            }}
          />
        ) : (
          userTracks.map((userTrack) => {
            const track = tracks.find((track) => track.id === userTrack.trackId)
            return track && <TrackCard userTrack={userTrack} track={track} />
          })
        )}
      </ul>
    )
  }, [isLoadingTracks, tracks, userTracks])

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Your tracks</h2>
      {renderAddTrackButton()}
      {renderAddTrackForm()}
      {renderTrackList()}
    </div>
  )
}
