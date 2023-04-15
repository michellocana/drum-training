import { SVGAttributes } from 'react'

export default function PlusIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14 8V6L8 6L8 0L6 0L6 6L0 6V8L6 8V14H8L8 8L14 8Z'
        fill='currentColor'
      />
    </svg>
  )
}
