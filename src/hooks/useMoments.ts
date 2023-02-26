import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { app } from '../contexts/AuthProvider'
import { DatabaseEntities } from '../types/database'
import { Moment, MomentData } from '../types/moment'

export default function useMoments(trackId: string) {
  const [moments, setMoments] = useState<Moment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const db = useMemo(() => getFirestore(app), [])

  const addMoment = useCallback(
    async (moment: Omit<MomentData, 'trackId'>) => {
      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<Moment>
      await addDoc<MomentData>(momentsRef, { ...moment, trackId })
    },
    [db, trackId],
  )

  const updateMoment = useCallback(
    async ({ id, ...updatedMoment }: Moment) => {
      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<MomentData>
      const momentRef = doc(momentsRef, id)
      await updateDoc<MomentData>(momentRef, updatedMoment)
    },
    [db],
  )

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
      updateMoment,
      deleteMoment,
    }),
    [addMoment, updateMoment, deleteMoment, isLoading, moments],
  )
}
