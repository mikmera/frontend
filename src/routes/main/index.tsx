import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'

export const Main: React.FC = wrapError(() => {
  return (
    <Box
      sx={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}
    >
      {/* <Alert severity="info" sx={{ width: '100%' }}>
        실전배틀을 더욱 재미있고 편리하게! 포케지지가 오픈했습니다
      </Alert> */}
    </Box>
  )
})
