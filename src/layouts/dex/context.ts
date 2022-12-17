import React from 'react'
import { Usage } from '~/types'

export type DexContextData = {
  type: 'single' | 'double' | 'sereisSingle' | 'seriesDouble'
  usages: Usage[] | null
  count: number
}

export const DexLayoutContext = React.createContext<{
  data: DexContextData
  update: (cb: (data: DexContextData) => DexContextData) => void
}>({
  data: {
    usages: [],
    type: 'single',
    count: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useDexContext = () => React.useContext(DexLayoutContext)
