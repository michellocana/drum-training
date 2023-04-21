import { useState, useEffect } from 'react'

const MOBILE_THRESHOLD = 940

export default function useIsMobile() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width < MOBILE_THRESHOLD
}
