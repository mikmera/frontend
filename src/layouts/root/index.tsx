import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { wrapError } from '~/components/ErrorBoundary'
import { Nav } from './nav'

export const RootLayout: React.FC = wrapError(() => {
  return (
    <Box>
      <Nav />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Spacer */}
        <Toolbar />
        <Box sx={{ flexGrow: 1, height: 0, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
})
