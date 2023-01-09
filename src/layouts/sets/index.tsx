import React from 'react'
import useSWR from 'swr'
import { fetcher } from '~/util'
import { Outlet, useParams } from 'react-router-dom'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import {
  AutoCompleteContext,
  AutoCompleteData,
  SetsContextData,
  SetsLayoutContext,
} from './context'
import { SearchBar, SearchFilters } from './SearchFilters'
import { Alert } from '@mui/material'

export const SetsLayout: React.FC = wrapError(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [data, setData] = React.useState<SetsContextData>({
    sets: [],
    type: 'single',
    count: 0,
  })

  const { data: sets } = useSWR(`/v1/sets?offset=${1}&type=single`, fetcher)

  React.useEffect(() => {
    setData((v) => ({ ...v, type: 'single' }))
  }, [])

  React.useEffect(() => {
    if (!sets) return

    setData((v) => ({
      ...v,
      sets: sets.sets,
      count: sets.count,
    }))
  }, [sets])

  return (
    <SetsLayoutContext.Provider
      value={{
        data,
        update: setData,
      }}
    >
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            marginLeft: isMobile ? 0 : '20px',
            marginRight: isMobile ? 0 : '20px',
            height: '100%',
          }}
        >
          <SearchBar />
          <SearchFilters />
          <Outlet />
          <Toolbar />
        </Box>
      </Box>
    </SetsLayoutContext.Provider>
  )
})

export const AutoCompleteLayout: React.FC = wrapError(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [data, setData] = React.useState<AutoCompleteData>({
    pokemon: [],
    items: [],
    natures: [],
  })

  React.useEffect(() => {
    setData((v) => ({ ...v, data: {} }))
  }, [])

  const { data: pokemons } = useSWR('/v1/autocomplete/pokemons', fetcher)
  const { data: items } = useSWR('/v1/autocomplete/items', fetcher)
  const { data: natures } = useSWR('/v1/autocomplete/natures', fetcher)

  React.useEffect(() => {
    if (!pokemons) return

    setData((v) => ({
      ...v,
      pokemon: pokemons.pokemons,
    }))
  }, [pokemons])

  React.useEffect(() => {
    if (!items) return

    setData((v) => ({
      ...v,
      items: items.items,
    }))
  }, [items])

  React.useEffect(() => {
    if (!natures) return

    setData((v) => ({
      ...v,
      natures: natures.natures,
    }))
  }, [natures])

  return (
    <AutoCompleteContext.Provider
      value={{
        data,
        update: setData,
      }}
    >
      <Alert severity="warning">
        패러독스 포켓몬은 현재 기술셋이 없어 등록이 불가합니다
      </Alert>
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            marginLeft: isMobile ? 0 : '20px',
            marginRight: isMobile ? 0 : '20px',
            height: '100%',
          }}
        >
          <Outlet />
          <Toolbar />
        </Box>
      </Box>
    </AutoCompleteContext.Provider>
  )
})
