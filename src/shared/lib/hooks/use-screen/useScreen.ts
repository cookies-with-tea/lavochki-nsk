import { useEffect, useState } from 'react'

const BREAKPOINTS = {
  md: 768,
  lg: 1200,
  xl: 1440,
}

function sizes(screen) {
  if (screen >= BREAKPOINTS.xl) return 'xl'
  else if (screen >= BREAKPOINTS.lg) return 'lg'
  else if (screen >= BREAKPOINTS.md) return 'md'
  else return 'sm'
}

const REGEX_MOBILE1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|.../i
const REGEX_MOBILE2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|.../i
const REGEX_MOBILE_OR_TABLET1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|.../i
const REGEX_MOBILE_OR_TABLET2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|.../i

function isMobileView(userAgent) {
  if (!userAgent) return false
  return REGEX_MOBILE1.test(userAgent) || REGEX_MOBILE2.test(userAgent.substr(0, 4))
}

function isMobileOrTabletView(userAgent) {
  if (!userAgent) return false
  return REGEX_MOBILE_OR_TABLET1.test(userAgent) || REGEX_MOBILE_OR_TABLET2.test(userAgent.substr(0, 4))
}

export const useScreen = () => {
  const [screen, setScreen] = useState({
    size: '',
    width: 0,
    height: 0,
    isAlbumOrient: false,
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isMobileOrTablet: false,
  })

  useEffect(() => {
    const updateScreen = () => {
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight

      setScreen((prevScreen) => ({
        ...prevScreen,
        sizes: sizes(innerWidth),
        width: innerWidth,
        height: innerHeight,
        isMobile: ['sm'].includes(sizes(innerWidth)),
        isTablet: ['md'].includes(sizes(innerWidth)),
        isLaptop: ['lg'].includes(sizes(innerWidth)),
        isDesktop: ['xl'].includes(sizes(innerWidth)),
        isMobileOrTablet: ['md', 'sm'].includes(sizes(innerWidth)),
      }))
    }

    updateScreen()

    window.addEventListener('DOMContentLoaded', updateScreen)
    window.addEventListener('resize', updateScreen)

    return () => {
      window.removeEventListener('DOMContentLoaded', updateScreen)
      window.removeEventListener('resize', updateScreen)
    }
  }, [])

  return {
    size: screen.size,
    isMobile: screen,
    isTablet: screen.isTablet,
    isLaptop: screen.isLaptop,
    isDesktop: screen.isDesktop,
    isMobileOrTablet: screen.isMobileOrTablet,
  }
}
