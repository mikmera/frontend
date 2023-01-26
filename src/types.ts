export type StatKey = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe'

export interface Pokemon {
  locales: Record<string, string | undefined>
  sites: Record<string, string | undefined>
  stats: Record<StatKey, number>
  // TODO abilities
  _id: string // mongodb object id
  id: number
  dexId: number
  formId: number
  name: string
  types: string[]
}

export interface Locales {
  ko: string
  jp: string
}

export interface Stats {
  hp: number
  atk: number
  def: number
  spa: number
  spd: number
  spe: number
}

export interface Terastalize {
  type: string
  usage: `${number}`
}

export interface Abilities {
  name: string
  type: 'hidden' | 'normal' | 'unknown'
  usage: `${number}`
}

export interface Items {
  name: string
  usage: `${number}`
}

export interface Moves {
  id: number
  category: 'physical' | 'special' | 'status'
  name: string
  type: string
  usage: `${number}`
  locales: Locales
}

export interface Natures {
  name: string
  usage: `${number}`
  plus: 'atk' | 'def' | 'spa' | 'spd' | 'spe' | 'none'
  show: string
}
export interface Usage {
  pokemon: Pokemon
  terastalize: Terastalize[]
  abilities: Abilities[]
  natures: Natures[]
  items: Items[]
  moves: Moves[]
}

export interface PokemonSets {
  _id: string
  type: ['single' | 'double']
  name: string
  description: string
  createdAt: string
  updatedAt: string
  pokemon: Pokemon
  item: {
    id: number
    name: string
    locales: Locales
    _id: string
  }
  nature: {
    _id: string
    id: number
    name: string
    locales: Locales
  }
  ability: {
    _id: string
    id: number
    name: string
    locales: Locales
  }
  terastalize: {
    _id: string
    id: number
    name: string
    locales: Locales
  }
  teratype: {
    _id: string
    id: number
    name: string
    locales: Locales
  }
  evs: Stats
  ivs: Stats
  moves: Moves[]
}

export interface SetcardProps {
  item: PokemonSets
  key: number
}
