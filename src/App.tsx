import './App.css'
import MomentButton from './components/MomentButton'
import Player from './components/Player'
import MomentProvider, { MomentContext } from './contexts/MomentProvider'
import PlayerProvider from './contexts/PlayerProvider'

export default function App() {
  return (
    <MomentProvider>
      <MomentContext.Consumer>
        {({ moments }) => (
          <PlayerProvider>
            <section className='App'>
              <div className='App-container'>
                <Player />

                <ul>
                  {moments.map((moment, index) => (
                    <li key={index}>
                      <MomentButton moment={moment} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </PlayerProvider>
        )}
      </MomentContext.Consumer>
    </MomentProvider>
  )
}
