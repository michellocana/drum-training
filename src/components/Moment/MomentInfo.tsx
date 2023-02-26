import { Form, Formik } from 'formik'
import useMoments from '../../hooks/useMoments'
import { Moment, MomentData } from '../../types/moment'
import { MomentSchema } from '../../types/schema'
import Button from '../UI/Button'
import Input from '../UI/Input'

type MomentInfoProps = {
  moment: Moment
  onDelete(): void
}

export default function MomentInfo({ moment, onDelete }: MomentInfoProps) {
  const { id, ...initialValues } = moment
  const { updateMoment } = useMoments(initialValues.trackId)

  return (
    <li key={id} style={{ padding: 8 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={MomentSchema}
        onSubmit={async ({ name, start, end }, { setValues }) => {
          const updatedMoment: MomentData = {
            name,
            start: Number(start),
            end: Number(end),
            trackId: initialValues.trackId,
          }

          setValues(updatedMoment)
          await updateMoment({ ...moment, ...updatedMoment })
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'grid', gridTemplateColumns: 'repeat(5, max-content)', gap: 8 }}>
            <Input name='name' placeholder='name' size={8} />
            <Input name='start' placeholder='start' size={3} />
            <Input name='end' placeholder='end' size={3} />
            <Button type='submit' isLoading={isSubmitting}>
              Update
            </Button>
            <Button type='button' onClick={onDelete}>
              Delete
            </Button>
          </Form>
        )}
      </Formik>
    </li>
  )
}
