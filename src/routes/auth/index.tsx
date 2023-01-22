import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { Login } from './login'
import { MyPage } from './mypage'
import { authService } from '~/service/firebase'
import { User } from 'firebase/auth'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

export const Main: React.FC = wrapError(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [user, setUser] = React.useState<User | null>(null)

  authService.onAuthStateChanged((user) => {
    setUser(user)
  })

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
      {user ? <MyPage user={user} /> : <Login />}
    </Box>
  )
})
