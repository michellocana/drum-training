import { useRef, useState, useCallback } from 'react'
import YouTube from 'react-youtube'
import './App.css'

type Moment = {
  name: string
  start: number
  end: number
}

const moments: Moment[] = [
  {
    name: 'Moment 1',
    start: 68,
    end: 76,
  },
  {
    name: 'Moment 2',
    start: 130,
    end: 150,
  },
]

export default function App() {
  const ytRef = useRef<YouTube>(null)
  const [currentMoment, setCurrentMoment] = useState(moments[0])

  const startLoop = useCallback(() => {
    ytRef.current?.getInternalPlayer().seekTo(currentMoment.start)
  }, [currentMoment.start])

  const getMomentLabel = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    console.log({ minutes, seconds })

    return [minutes, seconds].map((item) => item.toString().padStart(2, '0')).join(':')
  }, [])

  return (
    <section className='App'>
      <div className='App-container'>
        <YouTube
          ref={ytRef}
          videoId='BuzJ5NArvgw'
          opts={{ playerVars: { end: currentMoment.end } }}
          onReady={() => startLoop()}
          onEnd={() => startLoop()}
        />

        <ul>
          {moments.map((moment, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setCurrentMoment(moment)
                  startLoop()
                }}
              >
                {moment.name} / {getMomentLabel(moment.start)}/{getMomentLabel(moment.end)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
