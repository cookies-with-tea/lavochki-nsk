import { createContext } from 'react'

interface IValues {
  toggleColorMode?: () => void,
}

export const ThemeContext = createContext<IValues>({})
