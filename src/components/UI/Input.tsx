import { ErrorMessage, Field, GenericFieldHTMLAttributes } from 'formik'

import s from './Input.module.css'

type InputProps = GenericFieldHTMLAttributes & {
  name: string
  type?: string
}

export default function Input({ name, type = 'text', ...otherProps }: InputProps) {
  return (
    <div className={s.container}>
      <Field name={name} type={type} className={s.field} {...otherProps} />
      <ErrorMessage name={name} className={s.error} />
    </div>
  )
}
