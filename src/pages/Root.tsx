import { useState } from 'react'
import { useAuth, useDatabase } from '../contexts/FirebaseProvider'
import { Track } from '../types/track'

export default function Root() {
  const { user, login } = useAuth()
  const database = useDatabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          await login(email, password)
        }}
      >
        <input
          name='email'
          type='text'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          name='password'
          type='password'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button type='submit'>login</button>
      </form>

      <hr />

      <button
        onClick={() => {
          if (user) {
            const track: Track = {
              youtubeId: 'InFbBlpDTfQ',
              moments: [
                {
                  name: 'Moment 1',
                  start: 98,
                  end: 108,
                },
                {
                  name: 'Moment 1 extended',
                  start: 88,
                  end: 118,
                },
              ],
            }
            database.write(`tracks/midnightInAPerfectWorld`, track)
          }
        }}
      >
        save track
      </button>
    </>
  )
}
