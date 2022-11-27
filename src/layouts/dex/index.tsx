import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { DexContext, DexContextData } from './context'
import { MainSidebar } from './Sidebar'
import useSWR from 'swr'
import { fetcher } from '~/util'
import { Outlet } from 'react-router-dom'

export const DexLayout: React.FC = () => {
  const [data, setData] = React.useState<DexContextData>({
    usages: [],
    type: 'single',
  })

  const { data: usageData } = useSWR(`/v1/usage?type=${data.type}`, fetcher)

  React.useEffect(() => {
    if (!usageData) return

    setData((v) => ({
      ...v,
      usages: usageData.data,
    }))
  }, [usageData])

  return (
    <DexContext.Provider
      value={{
        data,
        update: setData,
      }}
    >
      <Box>
        <MainSidebar />
        <Box sx={{ marginLeft: '280px' }}>
          <Outlet />
        </Box>
      </Box>
    </DexContext.Provider>
  )
}
