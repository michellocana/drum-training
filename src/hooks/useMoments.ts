import {
  collection,
  CollectionReference,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { app } from '../contexts/AuthProvider'
import { DatabaseEntities } from '../types/database'
import { Moment } from '../types/moment'

export function useMoments(trackId: string) {
  const [moments, setMoments] = useState<Moment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const db = useMemo(() => getFirestore(app), [])

  useEffect(() => {
    async function fetchMoments() {
      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<Moment>
      const momentsQuery = query(momentsRef, where('trackId', '==', trackId))

      onSnapshot(momentsQuery, (snapshot) => {
        setIsLoading(true)

        setMoments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        )

        setIsLoading(false)
      })
    }

    if (!isLoading) {
      fetchMoments()
    }
  }, [db, isLoading, trackId])

  return { isLoading, moments }
}
