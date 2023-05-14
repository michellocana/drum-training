import { SVGAttributes } from 'react'

export default function PlayIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 21' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.112 19.68C1.782 20.57 0 19.616 0 18.018V2.003C0 .407 1.78-.547 3.108.34l12.002 7.99a2 2 0 01.004 3.327L3.111 19.68z'
        clipRule='evenodd'
      />
    </svg>
  )
}
