import { createContext, useContext } from 'react'
import { UserMe } from './types/user'

export type GlobalContextData = 'light' | 'dark'

export interface MainContextData {
  theme: GlobalContextData
  user: UserMe | null
}

export const MainContext = createContext<{
  theme: GlobalContextData
  user: UserMe | null
  // eslint-disable-next-line no-unused-vars
  update: (cb: (data: MainContextData) => MainContextData) => void
}>({
  theme: 'dark',
  user: null,
  update: () => {},
})

export const useMainContext = () => useContext(MainContext)
