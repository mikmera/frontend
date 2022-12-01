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

export interface Terastalize {
  teratype: string
  percent: `${number}`
}

export interface Usage {
  pokemon: Pokemon
  terastalize: Terastalize[]
}
