import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const RootLayout: React.FC = () => {
  return (
    <Box>
      layout
      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}
