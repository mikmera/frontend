import { ApiBase } from './api'
import { PokemonTypeLabel, PokemonTypeValue } from './pokemon'

export type UsageType = 'single' | 'double'

// 공통 타입 정의
export type NumericString = `${number}`

// UsageResponse 및 Usage 구조
export interface UsageResponse extends ApiBase {
  data: Usage
}

export interface Usage {
  count: number
  lastupdate: number // Unix timestamp
  type: UsageType
  data: UsageData[]
}

// 서브 데이터 구조 정의
export interface AbilityData {
  name: string
  type: 'hidden' | 'normal'
  usage: NumericString
}

export interface ItemData {
  id: number
  name: string
  description: string
  usage: NumericString
}

export interface TerastalizeData {
  name: string
  type: PokemonTypeLabel
  usage: NumericString
}

export interface MoveData {
  name: string
  category: 'Physical' | 'Special' | 'Status'
  type: PokemonTypeLabel
  usage: NumericString
}

export interface TeammateType {
  pokemonHomeId: PokemonTypeValue
  translations: {
    ko: string
    en: PokemonTypeLabel
  }
}

export interface TeammateData {
  id: number
  formId: number
  dexId: number
  name: string
  types: {
    nameDetails: TeammateType
  }[]
}

// UsageData 구조 정의
export interface UsageData {
  pokemon: {
    id: number
    dexId: number
    formId: number
    name: {
      key: string
      translations: {
        ko: string
        en: string
        jp: string
      }
    }
    stats: {
      hp: number
      atk: number
      def: number
      spa: number
      spd: number
      spe: number
    }
    types: {
      nameDetails: {
        translations: {
          ko: string
          en: PokemonTypeLabel
        }
      }
    }[]
  }
  abilities: AbilityData[]
  items: ItemData[]
  terastalize: TerastalizeData[]
  moves: MoveData[]
  teammates: TeammateData[]
}
