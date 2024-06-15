import { PokemonSets, Stats, Moves, StatKey } from '~/types'
const Dictionary = {
  hp: 'H',
  atk: 'A',
  def: 'B',
  spa: 'C',
  spd: 'D',
  spe: 'S',
}

export const getShowdownText = (pokemon: PokemonSets) => {
  const result = []
  const nature: string = pokemon.nature.name
  const display = nature.slice(0, 1).toUpperCase() + nature.slice(1)
  result.push(`${pokemon.pokemon.name} @ ${pokemon.item.name}`)
  result.push(`Ability: ${pokemon.ability.name}`)
  result.push(`Tera Type: ${pokemon.teratype.name} `)
  result.push(`EVs: ${getEV(pokemon.evs, true)}`)
  result.push(`${display} Nature`)
  result.push(`IVs: ${getIV(pokemon.ivs, true)}`)
  for (const move of pokemon.moves) {
    result.push(`- ${move.name}`)
  }
  return result.join('\n')
}

export const getIV = (iv: Stats, type?: boolean) => {
  const result = []
  if (type) {
    for (const ikey in iv) {
      const key: StatKey = ikey as StatKey
      if (iv[key] !== 31)
        result.push(iv[key] + ' ' + key[0].toUpperCase() + key.slice(1))
    }
    return result.join(' / ')
  } else {
    for (const ikey in iv) {
      const key: StatKey = ikey as StatKey
      if (iv[key] === 31) result.push('V')
      else if (iv[key] === 30) result.push('U')
      else if (iv[key] === 0) result.push('Z')
      else result.push(iv[key])
    }
    return result.join('.')
  }
}

export const getEV = (ev: Stats, type?: boolean) => {
  const result = []
  if (type) {
    for (const ikey in ev) {
      const key: StatKey = ikey as StatKey
      if (ev[key] !== 0) result.push(ev[key] + ' ' + key)
    }
    return result.join(' / ')
  } else {
    for (const ikey in ev) {
      const key: StatKey = ikey as StatKey
      if (ev[key] !== 0) result.push(Dictionary[key] + ev[key])
    }
  }
  return result.join(' ')
}
