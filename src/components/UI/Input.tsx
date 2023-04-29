import { ErrorMessage, FieldValidator, useField } from 'formik'
import cn from 'classnames'

import s from './Input.module.css'
import Error from './Error'

type InputProps = React.HTMLProps<HTMLInputElement> & {
  name: string
  validate?: FieldValidator
  type?: string
  containerClassName?: string
}

export default function Input({
  name,
  validate,
  containerClassName,
  type = 'text',
  ...otherProps
}: InputProps) {
  const [field, meta] = useField<string>({ name, validate })
  const hasError = !!meta.error && meta.touched

  return (
    <div className={cn(s.container, containerClassName)}>
      <div className={cn(s.fieldWrapper, { [s.fieldWrapperHasError]: hasError })}>
        <input
          {...field}
          {...otherProps}
          type={type}
          className={cn(s.field, { [s.fieldHasError]: hasError })}
        />
      </div>
      {hasError && <ErrorMessage name={name}>{(error) => <Error>{error}</Error>}</ErrorMessage>}
    </div>
  )
}
