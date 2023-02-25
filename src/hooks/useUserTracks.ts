import { collection, CollectionReference, getFirestore, onSnapshot } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { app, useAuth } from '../contexts/AuthProvider'
import { UserTrack } from '../types/auth'
import { DatabaseEntities } from '../types/database'

export default function useUserTracks() {
  const { user, isLogged } = useAuth()
  const [userTracks, setUserTracks] = useState<UserTrack[]>([])
  const db = useMemo(() => getFirestore(app), [])
  const userId = user?.uid ?? ''

  useEffect(() => {
    if (isLogged) {
      const userTracksRef = collection(
        db,
        DatabaseEntities.Users,
        userId,
        DatabaseEntities.Tracks,
      ) as CollectionReference<UserTrack>

      const unsubscribe = onSnapshot(userTracksRef, (snapshot) => {
        setUserTracks(snapshot.docs.map((doc) => doc.data()))
      })

      return () => unsubscribe()
    }
  }, [db, isLogged, userId])

  return userTracks
}
