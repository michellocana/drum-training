import { SVGAttributes } from 'react'

export default function LoopIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      fill='none'
      viewBox='0 0 12 12'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6 10.5A4.5 4.5 0 0010.5 6H12A6 6 0 010 6c0-3.314 2.686-6 5.994-6A5.903 5.903 0 0110.5 2.032V0H12v4.5H7.5V3h1.854A4.409 4.409 0 006 1.5a4.5 4.5 0 100 9z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}
