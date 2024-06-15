import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { Outlet } from 'react-router-dom'
import useSWR from 'swr'
import { wrapError } from '~/components/ErrorBoundary'
import { fetcher } from '~/util'
import { AutoCompleteContext, AutoCompleteData } from './context'

export const AutoCompleteLayout: React.FC = wrapError(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [data, setData] = React.useState<AutoCompleteData>({
    pokemon: [],
    items: [],
    natures: [],
    types: [],
  })

  const urls = [
    { key: 'pokemon', url: '/v1/autocomplete/pokemons', dataKey: 'pokemons' },
    { key: 'items', url: '/v1/autocomplete/items', dataKey: 'items' },
    { key: 'natures', url: '/v1/autocomplete/natures', dataKey: 'natures' },
    { key: 'types', url: '/v1/autocomplete/types', dataKey: 'types' },
  ]

  urls.forEach(({ key, url, dataKey }) => {
    const { data: fetchedData } = useSWR(url, fetcher)
    React.useEffect(() => {
      if (!fetchedData) return

      setData((v) => ({
        ...v,
        [key]: fetchedData[dataKey],
      }))
    }, [fetchedData, key, dataKey])
  })

  return (
    <AutoCompleteContext.Provider
      value={{
        data,
        update: setData,
      }}
    >
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            marginLeft: isMobile ? '5px' : '20px',
            marginRight: isMobile ? '5px' : '20px',
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
