import Controls from '../components/Controls'
import Moments from '../components/Moment/Moments'
import Player from '../components/Player'
import TrainingNoTrack from '../components/Training/TrainingNoTrack'
import { useTracks } from '../contexts/TracksProvider'

export default function Training() {
  const { currentTrack } = useTracks()

  if (!currentTrack) {
    return <TrainingNoTrack />
  }

  console.log(currentTrack)
  return (
    <div style={{ padding: 40 }}>
      <Player />
      <Moments />
      <Controls />
    </div>
  )
}
