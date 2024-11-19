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
  name: {
    translations: {
      ko: string
    }
  }
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
  name: string
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
  description: {
    ko: string
  }
}

export interface Moves {
  id: number
  category: 'physical' | 'special' | 'status'
  name: string
  type: string
  usage: `${number}`
  locales: Locales
  description: {
    ko: string
  }
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
  teammates: {
    name: string
    dexId: number
    formId: number
    types: string[]
  }[]
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

export type PokemonTypes =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Electric'
  | 'Grass'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dragon'
  | 'Dark'
  | 'Steel'
  | 'Fairy'

export type PokemonNature =
  | 'Adamant'
  | 'Bashful'
  | 'Bold'
  | 'Brave'
  | 'Calm'
  | 'Careful'
  | 'Docile'
  | 'Gentle'
  | 'Hardy'
  | 'Hasty'
  | 'Impish'
  | 'Jolly'
  | 'Lax'
  | 'Lonely'
  | 'Mild'
  | 'Modest'
  | 'Naive'
  | 'Naughty'
  | 'Quiet'
  | 'Quirky'
  | 'Rash'
  | 'Relaxed'
  | 'Sassy'
  | 'Serious'
  | 'Timid'

export interface PokemonCalcSet {
  pokemon: string
  level: number
  types: PokemonTypes[]
  item: string
  nature: PokemonNature
  ability: {
    name: string
    enabled: boolean
  }
  terastalize: {
    type: PokemonTypes
    enabled: boolean
  }
  gender: 'M' | 'F' | 'N'
  currentHp: {
    value: number
    max: number
    percent: number
  }
  ivs: Stats
  evs: Stats
  realStats: Stats
  rankup: {
    atk: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
    def: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
    spa: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
    spd: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
    spe: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6
  }
  status: {
    name:
      | 'Healthy'
      | 'Burned'
      | 'Paralyzed'
      | 'Poisoned'
      | 'Badly Poisoned'
      | 'Asleep'
      | 'Frozen'
    BadlyPoisonedTurns:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
  }
  saltCure: boolean
}
export interface AutoCompleteDataPokemon {
  label: string
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
    },
  ]
  stats: {
    hp: number
    atk: number
    def: number
    spa: number
    spd: number
    spe: number
  }
}

export interface AutoCompleteDataDefault {
  label: string
  name: string
  id: string
}

export interface NatureAutoCompleteData {
  name: string
  id: string
  view: string
  correction: {
    atk: number
    def: number
    spa: number
    spd: number
    spe: number
  }
}

export interface TypeAutoCompleteData {
  name: string
  en: string
}
