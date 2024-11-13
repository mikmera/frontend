import { Box, Typography } from '@mui/material'
import { calculate, Generations, Move, Pokemon } from '@smogon/calc'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { FieldSelector } from './fieldSelector'
import { PokemonSet } from './pokemonSet'

const generation = Generations.get(9)
export const Main: React.FC = wrapError(() => {
  const result = calculate(
    generation,
    new Pokemon(generation, 'Gengar', {
      item: 'Choice Specs',
      nature: 'Timid',
      evs: { spa: 252 },
      boosts: { spa: 1 },
    }),
    new Pokemon(generation, 'Chansey', {
      item: 'Eviolite',
      nature: 'Calm',
      evs: { hp: 252, spd: 252 },
    }),
    new Move(generation, 'Focus Blast'),
  )
  console.log(result)
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        가능한 데미지: {result.damage?.join(' - ')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <PokemonSet />
        <FieldSelector />
        <PokemonSet />
      </Box>
    </Box>
  )
})
