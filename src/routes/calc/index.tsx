import { Box } from '@mui/material'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'

export const Main: React.FC = wrapError(() => {
  return <Box>Calc</Box>
})
