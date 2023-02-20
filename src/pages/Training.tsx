import ProfilePicture from '../components/User/ProfilePicture'
import { useAuth } from '../contexts/FirebaseProvider'

export default function Training() {
  const { user } = useAuth()

  return (
    <ul style={{ color: 'white' }}>
      <li>{user?.firstName}</li>
      <li>
        <ProfilePicture />
      </li>
    </ul>
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
