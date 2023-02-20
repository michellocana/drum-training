import { Formik, Form } from 'formik'
import { useAuth } from '../contexts/FirebaseProvider'
import * as Yup from 'yup'

import s from './Root.module.css'
import Input from '../components/UI/Input'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export default function Root() {
  const { login } = useAuth()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={async ({ email, password }) => {
        await login(email, password)
      }}
    >
      {() => (
        <section className={s.wrapper}>
          <div className={s.container}>
            <h1 className={s.title}>
              Welcome to <strong>Drum Training</strong>
            </h1>
            <h2 className={s.subtitle}>Sign in to continue.</h2>
            <Form noValidate className={s.form}>
              <Input name='email' type='email' />
              <Input name='password' type='password' />
              <button type='submit'>login</button>
            </Form>
          </div>
        </section>
      )}
    </Formik>
  )
}
