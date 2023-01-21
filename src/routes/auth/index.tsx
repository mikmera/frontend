import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { Login } from './login'
import { MyPage } from './mypage'
import { authService } from '~/service/firebase'
import { User } from 'firebase/auth'

export const Main: React.FC = wrapError(() => {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  return <Box>{user ? <MyPage user={user} /> : <Login />}</Box>
})
