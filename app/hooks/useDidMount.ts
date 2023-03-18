import { useEffect } from 'react'

export const useComponentDidMount = (cb: () => void): void => {
  useEffect(cb, [cb])
}
