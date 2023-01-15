import React from 'react'
import { PokemonSets } from '~/types'

export type SetsContextData = {
  type: 'single' | 'double' | 'all'
  sets: PokemonSets[] | null
  result: string[] | null
  count: number
  query: string
}

interface AutoCompleteDataPokemon {
  name: string
  id: number
  moves: [
    {
      locales: {
        ko: string
        jp: string
      }
      Mtype: string
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

interface TypeAutoCompleteData {
  name: string
  en: string
}

export type AutoCompleteData = {
  pokemon: AutoCompleteDataPokemon[] | null
  items: AutoCompleteDataDefault[] | null
  natures: NatureAutoCompleteData[] | null
  types: TypeAutoCompleteData[] | null
}

export const SetsLayoutContext = React.createContext<{
  data: SetsContextData
  update: (cb: (data: SetsContextData) => SetsContextData) => void
}>({
  data: {
    type: 'all',
    sets: [],
    count: 0,
    query: '',
    result: [],
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
    types: [],
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
})

export const useSetsContext = () => React.useContext(SetsLayoutContext)
export const useAutoCompleteContext = () =>
  React.useContext(AutoCompleteContext)
