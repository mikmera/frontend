import React from 'react'
import { Box } from '@mui/material'
import { wrapError } from '~/components/ErrorBoundary'

export const Main: React.FC = wrapError(() => {
  return <Box>Hello</Box>
})
