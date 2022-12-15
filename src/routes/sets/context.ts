import React from 'react'
import { PokemonSets } from '~/types'

export const SetsContext = React.createContext<PokemonSets | null>(null)

export const useCurrentSetItem = () =>
  React.useContext(SetsContext) as PokemonSets
