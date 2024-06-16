import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React from 'react'

interface Props {
  pokemons: { label: string; id: number }[]
  setPokemon: React.Dispatch<React.SetStateAction<string>>
}

export const PokemonAutocomplete: React.FC<Props> = ({
  pokemons,
  setPokemon,
}) => (
  <Autocomplete
    id="pokemons"
    options={pokemons}
    sx={{ width: '100%' }}
    renderInput={(params) => (
      <TextField
        sx={{ '& > p': { color: 'red' } }}
        label="포켓몬"
        {...params}
        helperText={
          params.inputProps.value ? '' : '* 올바른 포켓몬을 선택해주세요'
        }
      />
    )}
    onChange={(e, v) => {
      if (!v) return
      setPokemon(v.label)
    }}
  />
)
