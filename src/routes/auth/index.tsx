import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { Login } from './login'
import { MyPage } from './mypage'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import { useCookies } from 'react-cookie'

export const Main: React.FC = wrapError(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: isMobile ? 0 : '10px',
        marginRight: isMobile ? 0 : '10px',
      }}
    >
      <Login />
    </Box>
  )
})
