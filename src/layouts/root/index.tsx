import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Nav } from './nav'

export const RootLayout: React.FC = () => {
  return (
    <Box>
      <Nav />
      <Box>
        {/* Spacer */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
