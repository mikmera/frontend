import { useContext, createContext } from 'react'

export type GlobalContextData = 'light' | 'dark'
export interface User {
  avatarURL: string
  email: string
  id: string
  role: {
    admin: boolean
    banned: boolean
  }
  username: string
  verified: boolean
}

export const MainContext = createContext<{
  theme: GlobalContextData
  user: User | null
  update: (cb: (theme: GlobalContextData) => GlobalContextData) => void
}>({
  theme: 'dark',
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useMainContext = () => useContext(MainContext)
