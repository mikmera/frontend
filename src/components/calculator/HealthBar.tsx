import { Grid } from '@mui/material'
import React from 'react'
import { PokemonCalcSet } from '~/types'
import { wrapError } from '../ErrorBoundary'

interface HPbarProps {
  pokemon: PokemonCalcSet
  setpokemon: React.Dispatch<React.SetStateAction<PokemonCalcSet>>
}
export const HPBar: React.FC<HPbarProps> = wrapError(
  ({ setpokemon, pokemon }) => {
    return (
      <React.Fragment>
        <Grid item xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>현재 HP</p>
        </Grid>
        <Grid item xs={10} sx={{ marginTop: -4 }}>
          <p style={{ marginTop: -1 }}>
            <input
              type="text"
              style={{ width: 50 }}
              value={pokemon.currentHp.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value =
                  isNaN(Number(e.target.value)) ||
                  Number(e.target.value) > pokemon.currentHp.max
                    ? pokemon.currentHp.max
                    : Number(e.target.value)
                setpokemon({
                  ...pokemon,
                  currentHp: {
                    value: Number(e.target.value),
                    max: pokemon.currentHp.max,
                    percent: Math.round((value / pokemon.currentHp.max) * 100),
                  },
                })
              }}
            />
            / {pokemon.currentHp.max} (
            <input
              type="text"
              style={{ width: 50 }}
              value={pokemon.currentHp.percent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const percent =
                  isNaN(Number(e.target.value)) || Number(e.target.value) > 100
                    ? 100
                    : Number(e.target.value)
                setpokemon({
                  ...pokemon,
                  currentHp: {
                    value: Math.floor(pokemon.currentHp.max * (percent / 100)),
                    max: pokemon.currentHp.max,
                    percent: percent,
                  },
                })
              }}
            />
            %)
          </p>
        </Grid>
      </React.Fragment>
    )
  },
)
