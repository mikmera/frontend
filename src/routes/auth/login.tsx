import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import {
  Button,
  Box,
  TextField,
  Typography,
  Divider,
  Grid,
} from '@mui/material'
import {
  getRedirectResult,
  TwitterAuthProvider,
  signInWithRedirect,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { authService } from '~/service/firebase'
import TwitterIcon from '@mui/icons-material/Twitter'
import { VariantType, useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

async function loginWithTwitter() {
  const provider = new TwitterAuthProvider()
  await signInWithRedirect(authService, provider)
  await getRedirectResult(authService)
}

export async function logout() {
  await signOut(authService)
}

export const Login: React.FC = wrapError(() => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant })
  }

  async function loginWithEamil(email: string, password: string) {
    if (email === '' || password === '')
      return handleClickVariant('error', '이메일과 비밀번호를 입력해주세요')()
    try {
      await signInWithEmailAndPassword(authService, email, password)
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        handleClickVariant('error', '존재하지 않는 계정입니다')()
      } else if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email'
      ) {
        handleClickVariant(
          'error',
          '이메일 혹은 비밀번호가 일치하지 않습니다'
        )()
      } else if (error.code === 'auth/internal-error') {
        handleClickVariant('error', '서버 에러입니다')()
      } else if (error.code === 'auth/too-many-requests') {
        handleClickVariant('error', '로그인 시도 횟수가 많습니다')()
      } else if (error.code === 'auth/user-disabled') {
        handleClickVariant('error', '관리자에 의해 비활성화된 계정입니다')()
      }
    }
  }

  return (
    <Box sx={{ width: '35vh', alignItems: 'center', mt: '3' }}>
      <Grid container spacing={2} mt={3}>
        <Typography variant="h5" sx={{ width: '100%', textAlign: 'center' }}>
          로그인
        </Typography>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="이메일"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="비밀번호"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
      <Button
        size="large"
        variant="contained"
        sx={{ width: '100%', mt: 3 }}
        onClick={() => loginWithEamil(email, password)}
      >
        로그인
      </Button>
      <Divider sx={{ mt: 3 }}>또는</Divider>
      <Button
        size="large"
        variant="contained"
        sx={{ width: '100%', mt: 3 }}
        onClick={async () => navigate('/auth/register')}
      >
        회원 가입
      </Button>
      <Button
        size="large"
        variant="contained"
        sx={{ width: '100%', mt: 3, bgcolor: '#1DA1F2', color: '#fff' }}
        onClick={() => loginWithTwitter()}
      >
        <TwitterIcon /> 트위터로 로그인
      </Button>
    </Box>
  )
})
