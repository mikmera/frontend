import { createContext, useContext } from 'react'

export type GlobalContextData = 'light' | 'dark'
export interface User {
  id: string
  uid: string
  role: {
    admin: boolean
    banned: boolean
  }
  profile: {
    avatar: string
    bio: string
    displayName: string
  }
  rank: number
  points: number
  stats: {
    posts: number
    comments: number
    likes: number
    dislikes: number
    setuplods: number
  }
}

export interface MainContextData {
  theme: GlobalContextData
  user: User | null
}

export const MainContext = createContext<{
  theme: GlobalContextData
  user: User | null
  // eslint-disable-next-line no-unused-vars
  update: (cb: (data: MainContextData) => MainContextData) => void
}>({
  theme: 'dark',
  user: null,
  update: () => {},
})

export const useMainContext = () => useContext(MainContext)
