import { SVGAttributes } from 'react'

export default function BackwardIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 15' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M18.491.165A.97.97 0 0120 .971v12.323a.97.97 0 01-1.507.807L9.258 7.953a.97.97 0 01-.002-1.613L18.491.165z'
        clipRule='evenodd'
      ></path>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.666.165a.97.97 0 011.508.806v12.323a.97.97 0 01-1.507.807L.432 7.953A.97.97 0 01.431 6.34L9.666.165z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}
