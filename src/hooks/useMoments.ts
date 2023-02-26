import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { app } from '../contexts/AuthProvider'
import { DatabaseEntities } from '../types/database'
import { Moment, NewMoment } from '../types/moment'

export default function useMoments(trackId: string) {
  const [moments, setMoments] = useState<Moment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const db = useMemo(() => getFirestore(app), [])

  const addMoment = useCallback(
    async (moment: Omit<NewMoment, 'trackId'>) => {
      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<Moment>
      await addDoc<NewMoment>(momentsRef, { ...moment, trackId })
    },
    [db, trackId],
  )

  // TODO updateMoment

  const deleteMoment = useCallback(
    async (moment: Moment) => {
      const momentRef = doc(db, DatabaseEntities.Moments, moment.id)
      await deleteDoc(momentRef)
    },
    [db],
  )

  useEffect(() => {
    if (!isLoading) {
      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<Moment>
      const momentsQuery = query(momentsRef, where('trackId', '==', trackId))
      const unsubscribe = onSnapshot(momentsQuery, (snapshot) => {
        setIsLoading(true)

        setMoments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        )

        setIsLoading(false)
      })

      return () => unsubscribe()
    }
  }, [db, isLoading, trackId])

  return useMemo(
    () => ({
      isLoading,
      moments,
      addMoment,
      deleteMoment,
    }),
    [addMoment, deleteMoment, isLoading, moments],
  )
}
