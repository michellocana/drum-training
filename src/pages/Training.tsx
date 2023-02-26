import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ProfilePicture from '../components/User/ProfilePicture'
import { useAuth } from '../contexts/AuthProvider'
import { useTracks } from '../contexts/TracksProvider'
import useMoments from '../hooks/useMoments'
import useTrackThumbnail from '../hooks/useTrackThumbnail'
import { Moment, MomentData } from '../types/moment'
import { Track } from '../types/track'

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
                    <TrackThumbnail track={track} />
                  </li>
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

const MomentSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  start: Yup.number().required('Required field').lessThan(Yup.ref('end')),
  end: Yup.number().required('Required field').moreThan(Yup.ref('start')),
})

function MomentInfo({ moment, onDelete }: { moment: Moment; onDelete(): void }) {
  const { id, ...initialValues } = moment
  const { updateMoment } = useMoments(initialValues.trackId)

  return (
    <li key={id} style={{ padding: 8 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={MomentSchema}
        onSubmit={async ({ name, start, end }, { setValues }) => {
          const updatedMoment: MomentData = {
            name,
            start: Number(start),
            end: Number(end),
            trackId: initialValues.trackId,
          }

          setValues(updatedMoment)
          await updateMoment({ ...moment, ...updatedMoment })
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: 8 }}>
            <Input name='name' placeholder='name' size={8} />
            <Input name='start' placeholder='start' size={3} />
            <Input name='end' placeholder='end' size={3} />
            <Button type='submit' isLoading={isSubmitting}>
              Update
            </Button>
            <Button type='button' onClick={onDelete}>
              Delete
            </Button>
          </Form>
        )}
      </Formik>
    </li>
  )
}

function Moments({ trackId }: { trackId: string }) {
  const { isLoading, moments, addMoment, deleteMoment } = useMoments(trackId)

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
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </li>
      </ul>
    </>
  )
}

function TrackThumbnail({ track }: { track: Track }) {
  const thumbnail = useTrackThumbnail(track)

  return (
    <a href={thumbnail} target='_blank' rel='noreferrer noopener' style={{ color: 'white' }}>
      <img src={thumbnail} alt='' height={40} style={{ verticalAlign: 'middle' }} /> Video thumbnail
    </a>
  )
}
