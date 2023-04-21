import { AnimationProps, motion } from 'framer-motion'
import s from './MenuToggle.module.css'

type MenuToggleProps = {
  isActive: boolean
  onClick(): void
}

export default function MenuToggle({ isActive, onClick }: MenuToggleProps) {
  const variant = isActive ? 'close' : 'open'
  const transition: AnimationProps['transition'] = { ease: 'circIn' }

  return (
    <button onClick={() => onClick()} className={s.button}>
      <motion.div
        animate={variant}
        className={s.bar}
        transition={transition}
        variants={{
          close: { y: 0, rotate: 45 },
          open: { y: -9 },
        }}
      />
      <motion.div
        animate={variant}
        className={s.bar}
        transition={transition}
        variants={{
          close: { opacity: 0 },
          open: { opacity: 1 },
        }}
      />
      <motion.div
        animate={variant}
        className={s.bar}
        transition={transition}
        variants={{
          close: { y: 0, rotate: -45 },
          open: { y: 9 },
        }}
      />
    </button>
  )
}
