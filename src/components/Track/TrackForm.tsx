import { Form, Formik } from 'formik'
import { TrackSchema } from '../../types/schema'
import IconButton from '../UI/IconButton'
import Input from '../UI/Input'
import s from './TrackForm.module.css'

type TrackFormData = {
  name: string
  artist: string
  videoUrl: string
}

type TrackFormProps = {
  initialValues?: TrackFormData
  onSubmit(values: TrackFormData): void
  onCancel(): void
}

export default function TrackForm({
  onSubmit,
  onCancel,
  initialValues = { name: '', artist: '', videoUrl: '' },
}: TrackFormProps) {
  return (
    <Formik validationSchema={TrackSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <Input name='name' placeholder='Track Name' />
          <Input name='artist' placeholder='Artist' />
          <div className={s.submitWrapper}>
            <Input name='videoUrl' placeholder='YouTube Video URL' />
            <IconButton icon='cancel' size='small' type='button' theme='white' onClick={onCancel} />
            <IconButton icon='check' size='small' type='submit' isLoading={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  )
}
