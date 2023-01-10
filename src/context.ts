import { useContext, createContext } from 'react'

export type GlobalContextData = 'light' | 'dark'

export const ThemeContext = createContext<{
  theme: GlobalContextData
  update: (cb: (theme: GlobalContextData) => GlobalContextData) => void
}>({
  theme: 'dark',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useThemeContext = () => useContext(ThemeContext)
