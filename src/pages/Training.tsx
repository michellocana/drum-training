import MomentList from '../components/Moment/MomentList'
import Player from '../components/Player'
import TrainingNoTrack from '../components/Training/TrainingNoTrack'
import { useTracks } from '../contexts/TracksProvider'

import s from './Training.module.css'

export default function Training() {
  const { currentTrack } = useTracks()

  if (!currentTrack) {
    return <TrainingNoTrack />
  }

  return (
    <section className={s.container}>
      <h1 className={s.title}>
        <small className={s.subtitle}>Now training</small>
        {currentTrack.name} - {currentTrack.artist}
      </h1>

      <Player className={s.player} />
      <MomentList className={s.moments} />
    </section>
  )
}
