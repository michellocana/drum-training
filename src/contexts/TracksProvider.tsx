import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
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
import { TrackData, Track, TracksContextType } from '../types/track'
import { app, useAuth } from './AuthProvider'

const noop = async () => {}
const TracksContext = createContext<TracksContextType>({
  addTrack: noop,
  updateTrack: noop,
  deleteTrack: noop,
  isLoading: false,
  tracks: [],
  userTracks: [],
})

export default function TracksProvider({ children }: PropsWithChildren) {
  const { isLogged, user } = useAuth()
  const db = useMemo(() => getFirestore(app), [])
  const [tracks, setTracks] = useState<Track[]>([])
  const [isInitialFetch, setIsInitialFetch] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const userTracks = useUserTracks()

  const addTrack = useCallback(
    async (track: TrackData) => {
      // Add track
      const trackRef = await addDoc(collection(db, DatabaseEntities.Tracks), track)
      const userId = user?.uid ?? ''
      const trackId = trackRef?.id ?? ''

      // Link track to user
      const userTrack: UserTrack = { loops: 0, userId, trackId }
      await addDoc(collection(db, DatabaseEntities.UserTracks), userTrack)
    },
    [db, user?.uid],
  )

  const updateTrack = useCallback(
    async ({ id, ...track }: Track) => {
      const tracksRef = collection(db, DatabaseEntities.Tracks) as CollectionReference<Track>
      const trackRef = doc(tracksRef, id)
      await updateDoc<Track>(trackRef, track)
    },
    [db],
  )

  const deleteTrack = useCallback(
    async ({ id }: Track) => {
      // Delete track
      const tracksRef = collection(db, DatabaseEntities.Tracks) as CollectionReference<Track>
      const trackRef = doc(tracksRef, id)
      await deleteDoc(trackRef)

      // Delete user tracks
      const userTracksRef = collection(
        db,
        DatabaseEntities.UserTracks,
      ) as CollectionReference<UserTrack>
      const userTracksQuery = query(userTracksRef, where('trackId', '==', id))
      const userTracks = await getDocs(userTracksQuery)
      const batch = writeBatch(db)

      for (const doc of userTracks.docs) {
        batch.delete(doc.ref)
      }

      await batch.commit()
    },
    [db],
  )

  useEffect(() => {
    if (isLogged) {
      const userTrackIds = userTracks.map((userTrack) => userTrack.trackId)

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
        updateTrack,
        deleteTrack,
        isLoading,
        tracks,
        userTracks,
      }}
    >
      {children}
    </TracksContext.Provider>
  )
}

export function useTracks() {
  return useContext(TracksContext)
}
