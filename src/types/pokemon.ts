export const PokemonTypes = {
	NORMAL: '0',
	FIGHTING: '1',
	FLYING: '2',
	POISON: '3',
	GROUND: '4',
	ROCK: '5',
	BUG: '6',
	GHOST: '7',
	STEEL: '8',
	FIRE: '9',
	WATER: '10',
	GRASS: '11',
	ELECTRIC: '12',
	PSYCHIC: '13',
	ICE: '14',
	DRAGON: '15',
	DARK: '16',
	FAIRY: '17'
} as const

export type PokemonTypeKey = keyof typeof PokemonTypes // 'NORMAL' | 'FAIRY' | ...
export type PokemonTypeValue = (typeof PokemonTypes)[PokemonTypeKey] // '0' | '1' | ...
export type PokemonTypeLabel =
	| 'Normal'
	| 'Fighting'
	| 'Flying'
	| 'Poison'
	| 'Ground'
	| 'Rock'
	| 'Bug'
	| 'Ghost'
	| 'Steel'
	| 'Fire'
	| 'Water'
	| 'Grass'
	| 'Electric'
	| 'Psychic'
	| 'Ice'
	| 'Dragon'
	| 'Dark'
	| 'Fairy'
