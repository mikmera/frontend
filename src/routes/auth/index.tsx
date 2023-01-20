import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { Login } from './login'

export const Main: React.FC = wrapError(() => {
  return (
    <Box>
      <Login />
    </Box>
  )
})
