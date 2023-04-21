import cn from 'classnames'
import { useRef, useLayoutEffect, useState } from 'react'
import s from './SkeletonText.module.css'

type SkeletonTextProps = {
  fontSize: number
  lineHeight: number
  text: string
  className?: string
}

export default function SkeletonText({ text, className, fontSize, lineHeight }: SkeletonTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [rect, setRect] = useState<DOMRect>()

  useLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect())
    }
  }, [text, className, fontSize, lineHeight])

  return (
    <span
      className={cn(s.wrapper, className)}
      style={{ fontSize, lineHeight, width: rect?.width, height: rect?.height }}
      aria-hidden
    >
      <span className={s.text} ref={ref}>
        {text}
      </span>
    </span>
  )
}
