import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ProfilePicture from '../components/User/ProfilePicture'
import { useAuth } from '../contexts/AuthProvider'
import { useTracks } from '../contexts/TracksProvider'
import useDurationLabel from '../hooks/useDurationLabel'
import useMoments from '../hooks/useMoments'
import { Moment } from '../types/moment'

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
}

function MomentInfo({ moment, onDelete }: { moment: Moment; onDelete(): void }) {
  const momentStartLabel = useDurationLabel(moment.start)
  const momentEndLabel = useDurationLabel(moment.end)

  return (
    <li key={moment.id} style={{ padding: 8 }}>
      {moment.name + ' / ' + momentStartLabel + ' / ' + momentEndLabel + ' '}
      <Button onClick={onDelete}>Delete</Button>
    </li>
  )
}

function Moments({ trackId }: { trackId: string }) {
  const { isLoading, moments, addMoment, deleteMoment } = useMoments(trackId)
  const MomentSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    start: Yup.number().required('Required field').lessThan(Yup.ref('end')),
    end: Yup.number().required('Required field').moreThan(Yup.ref('start')),
  })

  return (
    <>
      Moments {isLoading && '(loading...)'}
      <ul>
        {moments.map((moment) => (
          <MomentInfo key={moment.id} moment={moment} onDelete={() => deleteMoment(moment)} />
        ))}
        <li style={{ padding: 8 }}>
          <Formik
            initialValues={{
              name: 'Moment',
              start: '5',
              end: '10',
            }}
            validationSchema={MomentSchema}
            onSubmit={async ({ name, start, end }, { resetForm }) => {
              resetForm()
              await addMoment({
                name,
                start: Number(start),
                end: Number(end),
              })
            }}
          >
            {({ isSubmitting }) => (
              <Form
                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 8 }}
              >
                <Input name='name' placeholder='name' size={8} />
                <Input name='start' placeholder='start' size={3} />
                <Input name='end' placeholder='end' size={3} />
                <Button type='submit' isLoading={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </li>
      </ul>
    </>
  )
}
