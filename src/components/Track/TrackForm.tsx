import { useState } from 'react'
import IconButton from '../UI/IconButton'

import { Form, Formik } from 'formik'
import { useAuth } from '../../contexts/AuthProvider'
import { useTracks } from '../../contexts/TracksProvider'
import { TrackSchema } from '../../types/schema'
import Input from '../UI/Input'
import s from './TrackForm.module.css'

export default function TrackForm() {
  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const { user } = useAuth()
  const { addTrack } = useTracks()

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Your tracks</h2>
      {isAddingTrack ? (
        <Formik
          validationSchema={TrackSchema}
          initialValues={{ name: '', artist: '', videoUrl: '' }}
          onSubmit={async (values) => {
            const userId = user?.uid ?? ''
            await addTrack({ ...values, userId: userId })
            setIsAddingTrack(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <Input name='name' placeholder='Track Name' />
              <Input name='artist' placeholder='Artist' />
              <div className={s.submitWrapper}>
                <Input name='videoUrl' placeholder='YouTube Video URL' />
                <IconButton
                  icon='cancel'
                  size='small'
                  type='button'
                  theme='white'
                  onClick={() => setIsAddingTrack(false)}
                />
                <IconButton icon='check' size='small' type='submit' isLoading={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <IconButton icon='plus' onClick={() => setIsAddingTrack(true)} />
      )}
    </div>
  )
}
