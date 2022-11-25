import usePlayer from '../hooks/usePlayer'

export default function Controls() {
  // TODO use player.setPlaybackRate(suggestedRate:number) to set playback rate (https://developers.google.com/youtube/iframe_api_reference)
  const {} = usePlayer()

  return (
    <ul>
      <li>
        <button onClick={() => {}}>Pause</button>
        <button onClick={() => {}}>0.25x</button>
        <button onClick={() => {}}>0.5x</button>
        <button onClick={() => {}}>0.75x</button>
        <button onClick={() => {}}>1x</button>
      </li>
    </ul>
  )
}
