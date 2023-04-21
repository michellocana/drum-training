import cn from 'classnames'
import { ROUND_IMAGE_SIZE, RoundImageProps } from '../UI/RoundImage'
import s from './SkeletonRoundImage.module.css'

type SkeletonRoundImageProps = Omit<RoundImageProps, 'src'>

export default function SkeletonRoundImage({ size, className }: SkeletonRoundImageProps) {
  const sizeUnits = ROUND_IMAGE_SIZE[size]
  const imageClassName = cn(s.image, className, {
    [s.imageIsTiny]: size === 'tiny',
    [s.imageIsSmall]: size === 'small',
    [s.imageIsLarge]: size === 'large',
  })

  return (
    <div
      className={imageClassName}
      style={{
        width: sizeUnits,
        height: sizeUnits,
      }}
    />
  )
}
