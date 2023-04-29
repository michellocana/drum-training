import cn from 'classnames'
import { Form, Formik } from 'formik'
import { useMoments } from '../../contexts/MomentsProvider'
import { MomentSchema } from '../../types/schema'
import Button from '../UI/Button'
import Input from '../UI/Input'
import MomentCard from './MomentCard'

import s from './MomentList.module.css'
import IconButton from '../UI/IconButton'
import { useState } from 'react'

type MomentListProps = {
  className: string
}

export default function MomentList({ className }: MomentListProps) {
  const { moments, addMoment } = useMoments()
  const [isAddingMoment, setIsAddingMoment] = useState(false)

  return (
    <div className={cn(s.container, className)}>
      <h2 className={s.title}>Moments {moments && `(${moments.length})`}</h2>
      <IconButton
        size='tiny'
        icon='plus'
        className={s.add}
        onClick={() => {
          console.log('add moment')
          setIsAddingMoment(true)
        }}
      />
      <ul className={s.list}>
        {moments?.map((moment) => (
          <MomentCard key={moment.id} moment={moment} />
        ))}
      </ul>

      {isAddingMoment && (
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
      )}
    </div>
  )
}
