import { Form, Formik } from 'formik'
import { useMoments } from '../../contexts/MomentsProvider'
import { MomentSchema } from '../../types/schema'
import Button from '../UI/Button'
import Input from '../UI/Input'
import MomentInfo from './MomentInfo'

export default function Moments() {
  const { isLoading, moments, addMoment } = useMoments()

  return (
    <>
      Moments {isLoading && '(loading...)'}
      <ul>
        {moments?.map((moment) => (
          <MomentInfo key={moment.id} moment={moment} />
        ))}
        <li style={{ padding: 8 }}>
          <Formik
            initialValues={{
              name: 'Moment',
              start: '5',
              end: '10',
            }}
            validationSchema={MomentSchema}
            onSubmit={async ({ name, start, end }, { resetForm }) => {
              resetForm()
              await addMoment({
                name,
                start: Number(start),
                end: Number(end),
              })
            }}
          >
            {({ isSubmitting }) => (
              <Form
                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 8 }}
              >
                <Input name='name' placeholder='name' size={8} />
                <Input name='start' placeholder='start' size={3} />
                <Input name='end' placeholder='end' size={3} />
                <Button type='submit' isLoading={isSubmitting}>
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </li>
      </ul>
    </>
  )
}
