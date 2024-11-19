import React from 'react'

export type DexContextData = {
  type: 'single' | 'double'
  usages: any
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

  update: () => {},
})

export const useDexContext = () => React.useContext(DexLayoutContext)
