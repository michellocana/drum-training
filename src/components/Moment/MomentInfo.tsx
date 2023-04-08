import { Form, Formik } from 'formik'
import { useMoments } from '../../contexts/MomentsProvider'
import { Moment, MomentData } from '../../types/moment'
import { MomentSchema } from '../../types/schema'
import Button from '../UI/Button'
import Input from '../UI/Input'
import MomentButton from '../MomentButton'

type MomentInfoProps = {
  moment: Moment
}

export default function MomentInfo({ moment }: MomentInfoProps) {
  const { id, ...initialValues } = moment
  const { updateMoment, deleteMoment } = useMoments()

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
          <Form style={{ display: 'grid', gridTemplateColumns: 'repeat(6, max-content)', gap: 8 }}>
            <Input name='name' placeholder='name' size={8} />
            <Input name='start' placeholder='start' size={3} />
            <Input name='end' placeholder='end' size={3} />
            <Button type='submit' isLoading={isSubmitting}>
              Update
            </Button>
            <Button type='button' onClick={() => deleteMoment(moment)}>
              Delete
            </Button>
            <MomentButton moment={moment} />
          </Form>
        )}
      </Formik>
    </li>
  )
}
