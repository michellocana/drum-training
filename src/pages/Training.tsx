import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { Form, Formik } from 'formik'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import ProfilePicture from '../components/User/ProfilePicture'
import { app, useAuth } from '../contexts/FirebaseProvider'
import { Moment } from '../types/moment'
import { Track } from '../types/track'
import { DatabaseEntities } from '../types/database'
import { UserTrack } from '../types/user'

export default function Training() {
  const { user } = useAuth()

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
          Tracks (TODO)
          <ul>
            <li>
              Track 1
              <ul>
                <li>Name</li>
                <li>Artist</li>
                <li>URL</li>
                <li>
                  Moments
                  <ul>
                    <li>Moment 1</li>
                    <li>Moment 2</li>
                  </ul>
                </li>
              </ul>
            </li>
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
          const track: Track = { ...values, userId: userId, moments: [] }
          const trackRef = await addDoc(collection(db, DatabaseEntities.Tracks), track)
          const trackId = trackRef?.id ?? ''

          // Add moment to track
          const moment: Moment = { name: 'Moment 1', start: 0, end: 10, trackId }
          await addDoc(
            collection(db, DatabaseEntities.Tracks, trackId, DatabaseEntities.Moments),
            moment,
          )

          // Link track to user
          const userTrack: UserTrack = { loops: 0, trackId: trackId }
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
