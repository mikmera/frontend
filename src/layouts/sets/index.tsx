import React from 'react'
import useSWR from 'swr'
import { fetcher } from '~/util'
import { Outlet, useParams } from 'react-router-dom'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { SetsContextData, SetsLayoutContext } from './context'
import { Input, FormControl, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import searchIcon from '~/assets/images/search.svg'
import { useSetsContext } from '~/layouts/sets/context'
import { Virtuoso } from 'react-virtuoso'
import { Spinner } from '~/components/Spinner'
import { SetCard } from './SetCard'

export const SetsLayout: React.FC = wrapError(() => {
  const [data, setData] = React.useState<SetsContextData>({
    sets: [],
    type: 'single',
  })

  const params = useParams<'type'>()

  const { data: usageData } = useSWR(`/v1/sets?offset=${1}`, fetcher)

  React.useEffect(() => {
    if (params.type) {
      setData((v) => ({ ...v, type: params.type as SetsContextData['type'] }))
    }
  }, [params.type])

  React.useEffect(() => {
    if (!usageData) return

    setData((v) => ({
      ...v,
      sets: usageData.data,
    }))
  }, [usageData])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
          <Outlet />
          <Toolbar />
        </Box>
      </Box>
    </SetsLayoutContext.Provider>
  )
})
