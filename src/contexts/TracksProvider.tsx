import {
  addDoc,
  collection,
  CollectionReference,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useUserTracks from '../hooks/useUserTracks'
import { UserTrack } from '../types/auth'
import { DatabaseEntities } from '../types/database'
import { NewMoment } from '../types/moment'
import { NewTrack, Track, TracksContextType } from '../types/track'
import { app, useAuth } from './AuthProvider'

const TracksContext = createContext<TracksContextType>({
  addTrack: async () => {},
  isLoading: false,
  tracks: [],
})

export default function TracksProvider({ children }: PropsWithChildren) {
  const { isLogged } = useAuth()
  const db = useMemo(() => getFirestore(app), [])
  const [tracks, setTracks] = useState<Track[]>([])
  const [isInitialFetch, setIsInitialFetch] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const userTracks = useUserTracks()

  const addTrack = useCallback(
    async (track: NewTrack) => {
      // Add track
      const trackRef = await addDoc(collection(db, DatabaseEntities.Tracks), track)
      const trackId = trackRef?.id ?? ''

      // Add moment to track
      const moment: NewMoment = { name: 'Moment 1', start: 0, end: 10, trackId }
      await addDoc(collection(db, DatabaseEntities.Moments), moment)

      // Link track to user
      const userTrack: UserTrack = { loops: 0, id: trackId }
      await addDoc(
        collection(db, DatabaseEntities.Users, track.userId, DatabaseEntities.Tracks),
        userTrack,
      )
    },
    [db],
  )

  useEffect(() => {
    if (isLogged) {
      const userTrackIds = userTracks.map((userTrack) => userTrack.id)

      if (userTrackIds.length) {
        setIsLoading(isInitialFetch)

        const tracksRef = collection(db, DatabaseEntities.Tracks) as CollectionReference<Track>
        const tracksQuery = query(tracksRef, where('__name__', 'in', userTrackIds))
        const unsubscribe = onSnapshot(tracksQuery, (snapshot) => {
          setIsLoading(false)
          setIsInitialFetch(false)
          setTracks(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          )
        })

        return () => unsubscribe()
      }
    } else {
      setTracks([])
      setIsInitialFetch(true)
      setIsLoading(true)
    }
  }, [db, isInitialFetch, isLogged, userTracks])

  return (
    <TracksContext.Provider
      value={{
        addTrack,
        isLoading,
        tracks,
      }}
    >
      {children}
    </TracksContext.Provider>
  )
}

export function useTracks() {
  return useContext(TracksContext)
}
