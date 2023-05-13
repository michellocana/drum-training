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
import {
  createContext,
  PropsWithChildren,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { DatabaseEntities } from '../types/database'
import { Moment, MomentContextType, MomentData } from '../types/moment'
import { app } from './AuthProvider'
import { useTracks } from './TracksProvider'

const noop = async () => {}
const MomentsContext = createContext<MomentContextType>({
  addMoment: noop,
  updateMoment: noop,
  deleteMoment: noop,
  selectMoment: noop,
  isLoading: true,
})

export default function MomentsProvider({ children }: PropsWithChildren) {
  const [moments, setMoments] = useState<Moment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMoment, setCurrentMoment] = useState<Moment | null>(null)
  const db = useMemo(() => getFirestore(app), [])
  const { currentTrack } = useTracks()

  const addMoment = useCallback(
    async (moment: Omit<MomentData, 'trackId'>) => {
      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<Moment>
      await addDoc<MomentData>(momentsRef, { ...moment, trackId: currentTrack?.id ?? '' })
    },
    [db, currentTrack],
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

  const selectMoment = useCallback((moment: Moment | null) => {
    setCurrentMoment(moment)
  }, [])

  useEffect(() => {
    if (currentTrack) {
      setMoments([])
      setCurrentMoment(null)
      setIsLoading(true)

      const momentsRef = collection(db, DatabaseEntities.Moments) as CollectionReference<Moment>
      const momentsQuery = query(momentsRef, where('trackId', '==', currentTrack.id))
      const unsubscribe = onSnapshot(momentsQuery, (snapshot) => {
        const newMoments = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        setMoments(newMoments)
        setCurrentMoment(newMoments.at(0) ?? null)
        setIsLoading(false)
      })

      return () => unsubscribe()
    }
  }, [db, currentTrack])

  return (
    <MomentsContext.Provider
      value={{
        addMoment,
        deleteMoment,
        updateMoment,
        selectMoment,
        moments,
        currentMoment,
        isLoading,
      }}
    >
      {children}
    </MomentsContext.Provider>
  )
}

export function useMoments() {
  return useContext(MomentsContext)
}
