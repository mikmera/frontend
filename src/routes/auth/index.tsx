import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { Login } from './login'
import { MyPage } from './mypage'
import { Callback } from './callback'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'

export const Main: React.FC = wrapError(() => {
  const theme = useTheme()
  const { mode } = useParams()
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
      {!mode && <MyPage />}
      {mode === 'login' && <Login />}
      {mode === 'callback' && <Callback />}
      {mode === 'mypage' && <MyPage />}
    </Box>
  )
})
