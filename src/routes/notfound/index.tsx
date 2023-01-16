import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { ErrorPage } from '~/components/404page'

export const NotFound: React.FC = wrapError(() => {
  return (
    <Box>
      <ErrorPage />
    </Box>
  )
})
