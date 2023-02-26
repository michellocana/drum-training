import { Form, Formik } from 'formik'
import TrackInfo from '../components/Track/TrackInfo'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ProfilePicture from '../components/User/ProfilePicture'
import { useAuth } from '../contexts/AuthProvider'
import { useTracks } from '../contexts/TracksProvider'

export default function Training() {
  const { user, logout } = useAuth()
  const { isLoading: isLoadingTracks, tracks, addTrack } = useTracks()

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        Infos <Button onClick={() => logout()}>logout</Button>
      </h1>
      <ul style={{ color: 'white' }}>
        <li>Username: {user?.userName}</li>
        <li>Firstname: {user?.firstName}</li>
        <li>
          <ProfilePicture />
        </li>
        <li>
          Tracks {isLoadingTracks ? '(loading...)' : `(${tracks.length})`}
          <ul>
            {tracks.map((track, index) => (
              <TrackInfo key={track.id} track={track} />
            ))}
          </ul>
        </li>
      </ul>
      <hr />
      <h2>New Track Form</h2>
      <Formik
        initialValues={{
          name: 'Midnight in a perfect world',
          artist: 'DJ Shadow',
          videoUrl: 'https://www.youtube.com/watch?v=InFbBlpDTfQ',
        }}
        onSubmit={async (values) => {
          const userId = user?.uid ?? ''
          await addTrack({ ...values, userId: userId })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input name='name' placeholder='name' />
            <Input name='artist' placeholder='artist' />
            <Input name='videoUrl' placeholder='video url' />
            <Button type='submit' isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
