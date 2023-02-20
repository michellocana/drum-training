import { Formik, Form } from 'formik'
import { useAuth } from '../contexts/FirebaseProvider'
import * as Yup from 'yup'

import s from './Root.module.css'
import Input from '../components/UI/Input'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid e-mail').required('Required field'),
  password: Yup.string().required('Required field'),
})

export default function Root() {
  const { login } = useAuth()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={({ email, password }) => login(email, password)}
      initialErrors={{ email: 'Required field' }}
      initialTouched={{ email: true }}
    >
      {() => (
        <section className={s.wrapper}>
          <div className={s.container}>
            <div className={s.text}>
              <h1 className={s.title}>
                Welcome to <strong>Drum Training</strong>
              </h1>
              <h2 className={s.subtitle}>Sign in to continue.</h2>
            </div>
            <Form noValidate className={s.form}>
              <Input name='email' type='email' placeholder='E-mail' />
              <Input name='password' type='password' placeholder='Password' />
              <button type='submit'>login</button>
            </Form>
          </div>
        </section>
      )}
    </Formik>
  )
}
