import { useContext } from 'react'
import { MomentContext } from '../contexts/MomentProvider'

// TODO delete this hook
export default function useMoment() {
  return useContext(MomentContext)
}
