import { Form, Formik } from 'formik'
import { MomentSchema } from '../../types/schema'
import IconButton from '../UI/IconButton'
import Input from '../UI/Input'
import s from './MomentForm.module.css'

type MomentFormData = {
  name: string
  start: number
  end: number
}

type MomentFormProps = {
  initialValues?: MomentFormData
  onSubmit(values: MomentFormData): void
  onCancel(): void
}

export default function MomentForm({
  onSubmit,
  onCancel,
  initialValues = { name: '', start: 0, end: 0 },
}: MomentFormProps) {
  return (
    <Formik validationSchema={MomentSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <Input name='name' placeholder='Moment Name' containerClassName={s.nameField} />
          <Input name='start' placeholder='Start time' />
          <Input name='end' placeholder='End time' />
          <IconButton icon='cancel' size='small' type='button' theme='white' onClick={onCancel} />
          <IconButton icon='check' size='small' type='submit' isLoading={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}
