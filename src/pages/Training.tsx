import Controls from '../components/Controls'
import MomentButton from '../components/MomentButton'
import Player from '../components/Player'
import MomentProvider, { MomentContext } from '../contexts/MomentProvider'
import PlayerProvider from '../contexts/PlayerProvider'

import s from './Training.module.css'

export default function Training() {
  return (
    <MomentProvider>
      <MomentContext.Consumer>
        {({ moments }) => (
          <PlayerProvider>
            <section className={s.container}>
              <Player />
              <Controls />
              <ul>
                {moments.map((moment, index) => (
                  <li key={index}>
                    <MomentButton moment={moment} />
                  </li>
                ))}
              </ul>
            </section>
          </PlayerProvider>
        )}
      </MomentContext.Consumer>
    </MomentProvider>
  )
}
