import React from 'react'
import { Usage } from '~/types'

export type DexContextData = {
  type: 'single' | 'double' | 'vgc'
  usages: Usage[] | null
}

export const DexLayoutContext = React.createContext<{
  data: DexContextData
  update: (cb: (data: DexContextData) => DexContextData) => void
}>({
  data: {
    usages: [],
    type: 'single',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useDexContext = () => React.useContext(DexLayoutContext)
