import React from 'react'
import {
	AutoCompleteDataDefault,
	AutoCompleteDataPokemon,
	NatureAutoCompleteData,
	PokemonSets,
	TypeAutoCompleteData
} from '~/types'

export type SetsContextData = {
	count: number
	query: string
	type: 'single' | 'double' | 'all'
	sets: PokemonSets[] | null
	result: PokemonSets[] | null
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
		result: []
	},
	update: () => {}
})

export const AutoCompleteContext = React.createContext<{
	data: AutoCompleteData

	update: (cb: (data: AutoCompleteData) => AutoCompleteData) => void
}>({
	data: {
		pokemon: [],
		items: [],
		natures: [],
		types: []
	},
	update: () => {}
})

export const useSetsContext = () => React.useContext(SetsLayoutContext)
export const useAutoCompleteContext = () => React.useContext(AutoCompleteContext)
