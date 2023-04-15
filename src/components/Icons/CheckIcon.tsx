import { SVGAttributes } from 'react'

export default function CheckIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox='0 0 16 12' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.6653 0.334734C16.1116 0.781046 16.1116 1.50466 15.6653 1.95098L6.52241 11.0938C6.30808 11.3082 6.01739 11.4286 5.71429 11.4286C5.41118 11.4286 5.12049 11.3082 4.90616 11.0938L0.334735 6.52242C-0.111578 6.0761 -0.111578 5.35249 0.334735 4.90617C0.781049 4.45986 1.50467 4.45986 1.95098 4.90617L5.71428 8.66947L14.049 0.334735C14.4953 -0.111578 15.219 -0.111579 15.6653 0.334734Z'
        fill='currentColor'
      />
    </svg>
  )
}
