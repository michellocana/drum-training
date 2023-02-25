import {
  collection,
  CollectionReference,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import useUserTracks from '../hooks/useUserTracks'
import { DatabaseEntities } from '../types/database'
import { Track, TracksContextType } from '../types/track'
import { app, useAuth } from './AuthProvider'

const TracksContext = createContext<TracksContextType>({
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
