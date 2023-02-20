import { Formik, Form } from 'formik'
import { useAuth, useDatabase } from '../contexts/FirebaseProvider'
import * as Yup from 'yup'

import s from './Root.module.css'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { FirebaseError } from 'firebase/app'
import { FIREBASE_AUTH_ERRORS } from '../constants/firebase'
import Error from '../components/UI/Error'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid e-mail').required('Required field'),
  password: Yup.string().required('Required field'),
})

const OptinSchema = Yup.object().shape({
  firstName: Yup.string().required('Required field'),
})

export default function Root() {
  const auth = useAuth()
  const database = useDatabase()
  const isOptinNeeded = auth.isLogged && !auth.optin

  if (!isOptinNeeded) {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async ({ email, password }, { setStatus }) => {
          try {
            const user = await auth.login(email, password)

            if (!user) {
              return
            }
          } catch (error) {
            if (error instanceof FirebaseError) {
              setStatus(FIREBASE_AUTH_ERRORS[error.code])
            }
          }
        }}
      >
        {({ isSubmitting, status }) => (
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
                {status && <Error>{status}</Error>}
                <div className={s.submitWrapper}>
                  <Button type='submit' isLoading={isSubmitting}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </div>
          </section>
        )}
      </Formik>
    )
  }

  return (
    <Formik
      initialValues={{ firstName: '' }}
      validationSchema={OptinSchema}
      onSubmit={({ firstName }, { setStatus }) =>
        database.write(`users/${auth.user?.uid}/optin/firstName`, firstName)
      }
    >
      {({ isSubmitting }) => (
        <section className={s.wrapper}>
          <div className={s.container}>
            <div className={s.text}>
              <h1 className={s.title}>
                Complete your <strong>profile</strong>
              </h1>
              <h2 className={s.subtitle}>We need just a little more info before you continue.</h2>
            </div>
            <Form noValidate className={s.form}>
              <Input name='firstName' placeholder='First name' />
              <div className={s.submitWrapper}>
                <Button type='submit' isLoading={isSubmitting}>
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </section>
      )}
    </Formik>
  )
}
