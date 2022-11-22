import { useEffect, useState } from 'react'

// https://github.com/chakra-ui/chakra-ui/issues/3580#issuecomment-1131211586
export const useMediaQuery = (mediaQueryString: string) => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    let qs = mediaQueryString

    if (qs.startsWith('@media')) {
      qs = qs.slice(6)
    }

    const mediaQueryList = window.matchMedia(qs)
    const listener = () => {
      setMatches(!!mediaQueryList.matches)
    }
    listener()
    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [mediaQueryString])

  return matches
}
