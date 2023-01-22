import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { SpeedDial } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SetsList } from './setsList'
import { useParams } from 'react-router-dom'
import { CreateSets } from './createSets'
import { authService } from '~/service/firebase'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'
import Swal from 'sweetalert2'

export const SetsView: React.FC = wrapError(() => {
  const navigate = useNavigate()
  const params = useParams<'mode'>()
  const [user, setUser] = React.useState<User | undefined>()

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (
        user &&
        (user.emailVerified ||
          user.providerData[0].providerId !== 'twitter.com')
      ) {
        setUser(user)
      }
    })
  }, [])

  return (
    <Box mt={5}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<AddIcon />}
        onClick={() => {
          if (user) {
            navigate('/sample/create')
          } else {
            Swal.fire({
              title: '로그인이 필요합니다',
              text: '로그인과 이메일인증이 완료된 사용자만 샘플을 등록할 수 있습니다',
              icon: 'error',
            })
          }
        }}
      />
      {params.mode === 'create' ? <CreateSets /> : <SetsList />}
    </Box>
  )
})
