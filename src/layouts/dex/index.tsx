import { Box } from '@mui/material'
import React from 'react'
import { DexLayoutContext, DexContextData } from './context'
import { MainSidebar } from './Sidebar'
import useSWR from 'swr'
import { fetcher } from '~/util'
import { Outlet, useParams } from 'react-router-dom'
import { wrapError } from '~/components/ErrorBoundary'

export const DexLayout: React.FC = wrapError(() => {
  const [data, setData] = React.useState<DexContextData>({
    usages: [],
    type: 'single',
  })

  const params = useParams<'type'>()

  const { data: usageData } = useSWR(`/v1/usage?type=${data.type}`, fetcher)

  React.useEffect(() => {
    if (params.type) {
      setData((v) => ({ ...v, type: params.type as DexContextData['type'] }))
    }
  }, [params.type])

  React.useEffect(() => {
    if (!usageData) return

    setData((v) => ({
      ...v,
      usages: usageData.data,
    }))
  }, [usageData])

  return (
    <DexLayoutContext.Provider
      value={{
        data,
        update: setData,
      }}
    >
      <Box sx={{ height: '100%' }}>
        <MainSidebar />
        <Box sx={{ marginLeft: '280px', height: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </DexLayoutContext.Provider>
  )
})
