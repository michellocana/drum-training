import cn from 'classnames'
import s from './RoundImage.module.css'

type RoundImageProps = {
  src: string
  size: 'tiny' | 'small' | 'large'
  className?: string
}

const ROUND_IMAGE_SIZE: Record<RoundImageProps['size'], number> = {
  tiny: 36,
  small: 40,
  large: 60,
}

export default function RoundImage({ src, size, className }: RoundImageProps) {
  const sizeUnits = ROUND_IMAGE_SIZE[size]
  const imageClassName = cn(s.image, className, {
    [s.imageIsTiny]: size === 'tiny',
    [s.imageIsSmall]: size === 'small',
    [s.imageIsLarge]: size === 'large',
  })

  return <img src={src} alt='' className={imageClassName} width={sizeUnits} height={sizeUnits} />
}
