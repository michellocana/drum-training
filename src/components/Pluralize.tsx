import { DetailedHTMLProps, HTMLAttributes, ReactHTML } from 'react'

type PluralizeProps<T extends keyof ReactHTML> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  count: number
  singular: string
  plural: string
  element?: T
}

export default function Pluralize<T extends keyof ReactHTML>({
  count,
  singular,
  plural,
  element,
  ...otherProps
}: PluralizeProps<T>) {
  const Container: string = element ?? 'div'
  return <Container {...otherProps}>{count > 1 ? plural : singular}</Container>
}
