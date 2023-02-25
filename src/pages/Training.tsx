import { Form, Formik } from 'formik'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ProfilePicture from '../components/User/ProfilePicture'
import { useAuth } from '../contexts/AuthProvider'
import { Moment } from '../types/moment'
import { useTracks } from '../contexts/TracksProvider'
import useMoments from '../hooks/useMoments'
import useDurationLabel from '../hooks/useDurationLabel'

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
          Tracks {isLoadingTracks && '(loading...)'}
          <ul>
            {tracks.map((track, index) => (
              <li key={track.id}>
                {track.name}
                <ul>
                  <li>{track.artist}</li>
                  <li>{track.videoUrl}</li>
                  <li>
                    <Moments trackId={track.id} />
                  </li>
                </ul>
              </li>
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

  function MomentInfo({ moment }: { moment: Moment }) {
    const momentStartLabel = useDurationLabel(moment.start)
    const momentEndLabel = useDurationLabel(moment.end)

    return (
      <li key={moment.id}>{moment.name + ' / ' + momentStartLabel + ' / ' + momentEndLabel}</li>
    )
  }

  function Moments({ trackId }: { trackId: string }) {
    const { isLoading, moments } = useMoments(trackId)

    return (
      <>
        Moments {isLoading && '(loading...)'}
        <ul>
          {moments.map((moment) => (
            <MomentInfo key={moment.id} moment={moment} />
          ))}
        </ul>
      </>
    )
  }
}
