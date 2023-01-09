import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import { Alert, Autocomplete, Avatar, Grid, Slider } from '@mui/material'
import { useAutoCompleteContext } from '~/layouts/sets/context'
import { apiUrl, fetcher } from '~/util'
import { Spinner } from '~/components/Spinner'

export const CreateSets: React.FC = () => {
  const { data, update } = useAutoCompleteContext()
  const [pokemons] = React.useState<[{ label: string }]>([{ label: '미싱노' }])
  const [items] = React.useState<[{ label: string }]>([{ label: '쪼리핑인형' }])
  const [natures] = React.useState<[{ label: string; name: string }]>([
    { label: '더러움', name: 'None' },
  ])
  const [moves] = React.useState<[{ label: string }]>([{ label: '쪼리핑펀치' }])
  const [pokemonDict] = React.useState<string[]>([])
  const [TempMove] = React.useState<string[]>([])
  const [abilities] = React.useState<[{ label: string }]>([{ label: '' }])
  const [pokemon, setPokemon] = React.useState<string>('미싱노')
  const [item, setItem] = React.useState<string>('쪼리핑인형')
  const [nature, setNature] = React.useState<string>('더러움')
  const [move, setMove] = React.useState<string>('쪼리핑펀치')

  React.useEffect(() => {
    if (!data.pokemon) return

    pokemons.pop()
    for (const pokemon of data.pokemon) {
      if (!pokemon.name) continue
      pokemons.push({
        label: pokemon.name,
      })
      pokemonDict.push(pokemon.name)
    }
  }, [data.pokemon])

  React.useEffect(() => {
    if (!data.items) return

    items.pop()
    for (const item of data.items) {
      if (!item.name) continue
      items.push({
        label: item.name,
      })
    }
  }, [data.items])

  React.useEffect(() => {
    if (!data.natures) return

    natures.pop()
    for (const nature of data.natures) {
      if (!nature.name) continue
      natures.push({
        label: `${nature.name} (${nature.view})`,
        name: nature.name,
      })
    }
  }, [data.natures])

  React.useEffect(() => {
    moves.splice(0, moves.length)
    if (pokemonDict.indexOf(pokemon) === -1) return
    const moveData = data.pokemon?.[pokemonDict.indexOf(pokemon)].moves
    if (!moveData) return

    for (const move of moveData) {
      if (TempMove.indexOf(move.name) !== -1) continue
      TempMove.push(move.name)
      moves.push({
        label: move.locales.ko,
      })
    }
  }, [pokemon])

  React.useEffect(() => {
    const fetchData = async () => {
      const { abilities: data } = await fetcher(
        apiUrl(`/v1/autocomplete/abilities/${pokemon}`)
      )
      if (!data) return
      abilities.splice(0, abilities.length)
      for (const ability of data) {
        abilities.push({
          label: ability.name,
        })
      }
    }
    if (pokemon === '미싱노') return
    fetchData().catch(console.error)
  }, [pokemon])

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {!data.pokemon || !data.items ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <Grid container sx={{ width: '450px', m: 3 }}>
          <Grid item xs={12} mb={4}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              샘플 등록하기
            </Typography>
            <TextField
              id="standard-basic"
              label="샘플 이름"
              variant="standard"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={4}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: 'auto',
                marginTop: '20px',
              }}
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(`/v1/sprites/pokemon/${pokemon}`)}
            />
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              id="pokemons"
              options={pokemons}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="포켓몬" />}
              onChange={(e, v) => {
                if (!v) return
                setPokemon(v.label)
              }}
            />
            <Autocomplete
              id="items"
              options={items}
              sx={{ width: 200, marginTop: '20px' }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    crossOrigin="anonymous"
                    loading="lazy"
                    width="30"
                    src={apiUrl(`/v1/sprites/items/${option.label}`)}
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="지닌물건" />
              )}
              onChange={(e, v) => {
                if (!v) return
                setItem(v.label)
              }}
            />
          </Grid>
          <Grid item xs={6} mt={4}>
            <Autocomplete
              id="natures"
              options={natures}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label="성격" />}
              onChange={(e, v) => {
                if (!v) return
                setNature(v.name)
              }}
            />
          </Grid>
          <Grid item xs={6} mt={4}>
            <Autocomplete
              id="ability"
              options={abilities}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label="특성" />}
              onChange={(e, v) => {
                if (!v) return
              }}
            />
          </Grid>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={6} mt={4} key={i}>
              <Autocomplete
                id="move"
                options={moves}
                sx={{ width: 180 }}
                renderInput={(params) => <TextField {...params} label="기술" />}
                onChange={(e, v) => {
                  if (!v) return
                  setMove(v.label)
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
