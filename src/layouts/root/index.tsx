import React from 'react'
import { Nav } from './nav'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import { wrapError } from '~/components/ErrorBoundary'

export const RootLayout: React.FC = wrapError(() => {
  return (
    <Box>
      <Nav />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, height: 0, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
})
