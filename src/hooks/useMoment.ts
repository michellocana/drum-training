import { useContext } from 'react'
import { MomentContext } from '../contexts/MomentProvider'

export default function useMoment() {
  return useContext(MomentContext)
}
