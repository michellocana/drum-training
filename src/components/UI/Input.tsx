import { ErrorMessage, useField } from 'formik'
import cn from 'classnames'

import errorIcon from '../../assets/icons/error.svg'

import s from './Input.module.css'

type InputProps = JSX.IntrinsicElements['input'] & {
  name: string
  type?: string
}

export default function Input({ name, type = 'text', ...otherProps }: InputProps) {
  const [field, meta] = useField<string>(name)
  const hasError = !!meta.error && meta.touched

  return (
    <div className={s.container}>
      <div className={cn(s.fieldWrapper, { [s.fieldWrapperHasError]: hasError })}>
        <input
          {...field}
          {...otherProps}
          type={type}
          className={cn(s.field, { [s.fieldHasError]: hasError })}
        />
      </div>
      {hasError && (
        <ErrorMessage name={name}>
          {(error) => (
            <div className={s.error}>
              <img src={errorIcon} alt='' />
              {error}
            </div>
          )}
        </ErrorMessage>
      )}
    </div>
  )
}
