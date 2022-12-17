import React from 'react'
import { PokemonSets } from '~/types'

export type SetsContextData = {
  type: 'single' | 'double' | 'all'
  sets: PokemonSets[] | null
}

export const SetsLayoutContext = React.createContext<{
  data: SetsContextData
  update: (cb: (data: SetsContextData) => SetsContextData) => void
}>({
  data: {
    type: 'single',
    sets: [],
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useSetsContext = () => React.useContext(SetsLayoutContext)
