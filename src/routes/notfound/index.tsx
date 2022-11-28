import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'

export const NotFound: React.FC = wrapError(() => {
  return (
    <Box>
      <Typography>not found</Typography>
    </Box>
  )
})
