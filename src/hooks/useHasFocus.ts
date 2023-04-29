import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

export function useHasFocus<T extends HTMLElement>(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  RefObject<T>,
] {
  const [hasFocus, setHasFocus] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      const element = ref.current
      const onFocusIn = () => setHasFocus(true)
      const onFocusOut = () => setHasFocus(false)
      element.addEventListener('focusin', onFocusIn)
      element.addEventListener('focusout', onFocusOut)

      return () => {
        element.removeEventListener('focusin', onFocusIn)
        element.removeEventListener('focusout', onFocusOut)
      }
    }
  }, [])

  return [hasFocus, setHasFocus, ref]
}
