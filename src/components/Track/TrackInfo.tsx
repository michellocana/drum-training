import { Form, Formik } from 'formik'
import { useTracks } from '../../contexts/TracksProvider'
import { Track } from '../../types/track'
import Moments from '../Moment/Moments'
import Button from '../UI/Button'
import Input from '../UI/Input'
import TrackThumbnail from './TrackThumbnail'

type TrackInfoProps = {
  track: Track
}

export default function TrackInfo({ track }: TrackInfoProps) {
  const { updateTrack, deleteTrack } = useTracks()
  return (
    <li>
      {track.name}

      <ul>
        <li>
          <Formik initialValues={track} onSubmit={(values) => updateTrack(values)}>
            {({ isSubmitting }) => (
              <Form>
                <TrackThumbnail track={track} />

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8 }}>
                  <Input name='name' placeholder='name' size={20} />
                  <Input name='artist' placeholder='artist' size={20} />
                  <Input name='videoUrl' placeholder='video url' size={20} />
                  <Button type='submit' isLoading={isSubmitting}>
                    Edit
                  </Button>

                  <Button type='button' onClick={() => deleteTrack(track)}>
                    Delete
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </li>

        <li>
          <Moments trackId={track.id} />
        </li>
      </ul>
    </li>
  )
}
