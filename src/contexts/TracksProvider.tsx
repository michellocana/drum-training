import {
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { UserTrack } from '../types/auth'
import { DatabaseEntities } from '../types/database'
import { Track, TracksContextType } from '../types/track'
import { app, useAuth } from './AuthProvider'

const TracksContext = createContext<TracksContextType>({
  isLoading: false,
  tracks: [],
})

export default function TracksProvider({ children }: PropsWithChildren) {
  const { user, isLogged } = useAuth()
  const db = useMemo(() => getFirestore(app), [])
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchTracks() {
      setIsLoading(true)

      const userId = user?.uid ?? ''
      const userTracksRef = collection(
        db,
        DatabaseEntities.Users,
        userId,
        DatabaseEntities.Tracks,
      ) as CollectionReference<UserTrack>
      const userTracksSnapshot = await getDocs(userTracksRef)
      const userTrackIds = userTracksSnapshot.docs.map((doc) => doc.data().id)

      if (userTrackIds.length) {
        const tracksRef = collection(db, DatabaseEntities.Tracks) as CollectionReference<Track>
        const tracksQuery = query(tracksRef, where('__name__', 'in', userTrackIds))
        const tracksSnapshot = await getDocs(tracksQuery)

        setTracks(
          tracksSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        )
      }

      setIsLoading(false)
    }

    if (isLogged) {
      fetchTracks()
    }
  }, [db, user, isLogged])

  return (
    <TracksContext.Provider
      value={{
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
