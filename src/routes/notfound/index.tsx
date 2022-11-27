import { Typography, Box } from '@mui/material'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'

export const NotFound: React.FC = wrapError(() => {
  return (
    <Box>
      <Typography>not found</Typography>
    </Box>
  )
})
