import cn from 'classnames'
import { Form, Formik } from 'formik'
import { useMoments } from '../../contexts/MomentsProvider'
import { MomentSchema } from '../../types/schema'
import Input from '../UI/Input'
import MomentCard from './MomentCard'

import { useState } from 'react'
import IconButton from '../UI/IconButton'
import s from './MomentList.module.css'
import SkeletonMomentCard from '../Skeleton/SkeletonMomentCard'

type MomentListProps = {
  className: string
}

export default function MomentList({ className }: MomentListProps) {
  const { moments, addMoment, currentMoment, isLoading } = useMoments()
  const [isAddingMoment, setIsAddingMoment] = useState(false)

  return (
    <div
      className={cn(s.container, className, {
        [s.containerIsAddingMoment]: isAddingMoment,
      })}
    >
      <h2 className={s.title}>Moments {moments && !isLoading && `(${moments.length})`}</h2>

      {isAddingMoment ? (
        <Formik
          validationSchema={MomentSchema}
          initialValues={{ name: 'Moment', start: '5', end: '10' }}
          onSubmit={async ({ name, start, end }, { resetForm }) => {
            resetForm()
            await addMoment({
              name,
              start: Number(start),
              end: Number(end),
            })
            setIsAddingMoment(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className={s.form}>
              <Input name='name' placeholder='name' size={8} containerClassName={s.nameField} />
              <Input name='start' placeholder='start' size={3} />
              <Input name='end' placeholder='end' size={3} />
              <IconButton
                icon='cancel'
                size='small'
                type='button'
                theme='white'
                onClick={() => setIsAddingMoment(false)}
              />
              <IconButton icon='check' size='small' type='submit' isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      ) : (
        <IconButton
          size='tiny'
          icon='plus'
          className={s.add}
          onClick={() => setIsAddingMoment(true)}
        />
      )}

      <ul className={s.list}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonMomentCard key={index} />)
          : moments?.map((moment) => (
              <MomentCard
                isActive={currentMoment?.id === moment.id}
                key={moment.id}
                moment={moment}
              />
            ))}
      </ul>
    </div>
  )
}
