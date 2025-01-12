import { PokemonCalcSet, PokemonNature, PokemonTypes } from '~/types'
export const types = [
	{ name: '노말', value: 'normal' },
	{ name: '격투', value: 'fighting' },
	{ name: '비행', value: 'flying' },
	{ name: '독', value: 'poison' },
	{ name: '땅', value: 'ground' },
	{ name: '바위', value: 'rock' },
	{ name: '벌레', value: 'bug' },
	{ name: '고스트', value: 'ghost' },
	{ name: '강철', value: 'steel' },
	{ name: '불꽃', value: 'fire' },
	{ name: '물', value: 'water' },
	{ name: '풀', value: 'grass' },
	{ name: '전기', value: 'electric' },
	{ name: '에스퍼', value: 'psychic' },
	{ name: '얼음', value: 'ice' },
	{ name: '드래곤', value: 'dragon' },
	{ name: '악', value: 'dark' },
	{ name: '페어리', value: 'fairy' }
]

export const teratypes = [...types, { name: '스텔라', value: 'stellar' }]

export const status = [
	{ name: 'Healthy', ko: '상태이상 없음' },
	{ name: 'Burned', ko: '화상' },
	{ name: 'Paralyzed', ko: '마비' },
	{ name: 'Poisoned', ko: '독' },
	{ name: 'Badly Poisoned', ko: '맹독' },
	{ name: 'Asleep', ko: '잠듦' },
	{ name: 'Frozen', ko: '얼음' }
]

export class ClacPokemonSet {
	public pokemon: string
	public level: number
	public types: PokemonTypes[]
	public item: string
	public gender: 'M' | 'F' | 'N'
	public ability: { name: string; enabled: boolean }
	public nature: PokemonNature
	public terastalize: { type: PokemonTypes; enabled: boolean }
	public evs: {
		hp: number
		atk: number
		def: number
		spa: number
		spd: number
		spe: number
	}
	public ivs: {
		hp: number
		atk: number
		def: number
		spa: number
		spd: number
		spe: number
	}
	public realStats: {
		hp: PokemonCalcSet['realStats']['hp']
		atk: PokemonCalcSet['realStats']['atk']
		def: PokemonCalcSet['realStats']['def']
		spa: PokemonCalcSet['realStats']['spa']
		spd: PokemonCalcSet['realStats']['spd']
		spe: PokemonCalcSet['realStats']['spe']
	}
	public rankup: {
		atk: PokemonCalcSet['rankup']['atk']
		def: PokemonCalcSet['rankup']['def']
		spa: PokemonCalcSet['rankup']['spa']
		spd: PokemonCalcSet['rankup']['spd']
		spe: PokemonCalcSet['rankup']['spe']
	}
	public status: {
		name: PokemonCalcSet['status']['name']
		BadlyPoisonedTurns: PokemonCalcSet['status']['BadlyPoisonedTurns']
	}
	public saltCure: boolean
	public currentHp: { value: number; max: number; percent: number }

	constructor() {
		this.pokemon = 'jigglypuff'
		this.level = 50
		this.types = ['Normal', 'Fairy']
		this.item = 'Eviolite'
		this.gender = 'F'
		this.ability = { name: 'Cute Charm', enabled: false }
		this.nature = 'Bold'
		this.terastalize = { type: 'Fairy', enabled: false }
		this.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
		this.ivs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
		this.realStats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
		this.rankup = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
		this.status = { name: 'Healthy', BadlyPoisonedTurns: 0 }
		this.saltCure = false
		this.currentHp = { value: 222, max: 222, percent: 100 }
	}
}
