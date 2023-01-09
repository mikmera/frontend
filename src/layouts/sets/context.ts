import React from 'react'
import { PokemonSets } from '~/types'

export type SetsContextData = {
  type: 'single' | 'double'
  sets: PokemonSets[] | null
  count: number
}

interface AutoCompleteDataPokemon {
  name: string
  moves: [
    {
      locales: {
        ko: string
        jp: string
      }
      name: string
      route: string
      level: number
      _id: string
    }
  ]
}

interface AutoCompleteDataDefault {
  name: string
  id: string
}

interface NatureAutoCompleteData {
  name: string
  id: string
  view: string
}

export type AutoCompleteData = {
  pokemon: AutoCompleteDataPokemon[] | null
  items: AutoCompleteDataDefault[] | null
  natures: NatureAutoCompleteData[] | null
}

export const SetsLayoutContext = React.createContext<{
  data: SetsContextData
  update: (cb: (data: SetsContextData) => SetsContextData) => void
}>({
  data: {
    type: 'single',
    sets: [],
    count: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const AutoCompleteContext = React.createContext<{
  data: AutoCompleteData
  update: (cb: (data: AutoCompleteData) => AutoCompleteData) => void
}>({
  data: {
    pokemon: [],
    items: [],
    natures: [],
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useSetsContext = () => React.useContext(SetsLayoutContext)
export const useAutoCompleteContext = () =>
  React.useContext(AutoCompleteContext)
