import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { wrapError } from '~/components/ErrorBoundary'
import { fetcher } from '~/util'
import { DexContextData, DexLayoutContext } from './context'
import { MainSidebar } from './Sidebar'

export const DexLayout: React.FC = wrapError(() => {
  const [data, setData] = React.useState<DexContextData>({
    usages: [],
    type: 'single',
    count: 0,
  })

  const params = useParams<'type'>()

  const { data: usageData } = useSWR(
    `/v1/usage?type=${data.type}&offset=${0}`,
    fetcher,
  )

  React.useEffect(() => {
    if (params.type) {
      setData((v) => ({ ...v, type: params.type as DexContextData['type'] }))
    }
  }, [params.type])

  React.useEffect(() => {
    if (!usageData) return
    setData((v) => ({
      ...v,
      usages: usageData.data.data,
      count: usageData.data.count,
    }))
  }, [usageData])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <DexLayoutContext.Provider
      value={{
        data,
        update: setData,
      }}
    >
      <Box sx={{ height: '100%' }}>
        <MainSidebar />
        <Box sx={{ marginLeft: isMobile ? 0 : '280px', height: '100%' }}>
          {isMobile && (
            <React.Fragment>
              <Toolbar />
              <Divider />
            </React.Fragment>
          )}
          <Outlet />
        </Box>
      </Box>
    </DexLayoutContext.Provider>
  )
})
