import { useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerProvider'

export default function usePlayer() {
  return useContext(PlayerContext)
}
