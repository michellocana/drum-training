import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { Form, Formik } from 'formik'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ProfilePicture from '../components/User/ProfilePicture'
import { app, useAuth } from '../contexts/AuthProvider'
import { Moment, NewMoment } from '../types/moment'
import { NewTrack } from '../types/track'
import { DatabaseEntities } from '../types/database'
import { UserTrack } from '../types/auth'
import { useTracks } from '../contexts/TracksProvider'
import { useMoments } from '../hooks/useMoments'
import { useDurationLabel } from '../hooks/useDurationLabel'

function MomentInfo({ moment }: { moment: Moment }) {
  const momentStartLabel = useDurationLabel(moment.start)
  const momentEndLabel = useDurationLabel(moment.end)

  return <li key={moment.id}>{moment.name + ' / ' + momentStartLabel + ' / ' + momentEndLabel}</li>
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

export default function Training() {
  const { user } = useAuth()
  const { isLoading: isLoadingTracks, tracks } = useTracks()

  return (
    <div style={{ padding: 40 }}>
      <h1>Infos</h1>
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
      <h2>Track Form</h2>
      <Formik
        initialValues={{
          name: 'Midnight in a perfect world',
          artist: 'DJ Shadow',
          videoUrl: 'https://www.youtube.com/watch?v=InFbBlpDTfQ',
        }}
        onSubmit={async (values) => {
          const userId = user!.uid
          const db = getFirestore(app)

          // Add track
          const track: NewTrack = { ...values, userId: userId }
          const trackRef = await addDoc(collection(db, DatabaseEntities.Tracks), track)
          const trackId = trackRef?.id ?? ''

          // Add moment to track
          const moment: NewMoment = { name: 'Moment 1', start: 0, end: 10, trackId }
          await addDoc(collection(db, DatabaseEntities.Moments), moment)

          // Link track to user
          const userTrack: UserTrack = { loops: 0, id: trackId }
          await addDoc(
            collection(db, DatabaseEntities.Users, userId, DatabaseEntities.Tracks),
            userTrack,
          )
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

  // return (
  //   <MomentProvider>
  //     <button onClick={logout}>logout</button>
  //     <MomentContext.Consumer>
  //       {({ moments }) => (
  //         <PlayerProvider>
  //           <section className={s.container}>
  //             <Player />
  //             <Controls />
  //             <ul>
  //               {moments.map((moment, index) => (
  //                 <li key={index}>
  //                   <MomentButton moment={moment} />
  //                 </li>
  //               ))}
  //             </ul>
  //           </section>
  //         </PlayerProvider>
  //       )}
  //     </MomentContext.Consumer>
  //   </MomentProvider>
  // )
}
