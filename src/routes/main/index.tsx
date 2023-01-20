import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'

export const Main: React.FC = wrapError(() => {
  return (
    <Box
      sx={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}
    >
      Main
    </Box>
  )
})
