import React from 'react'
import Swal from 'sweetalert2'
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
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  sendEmailVerification,
  signOut,
} from 'firebase/auth'
import { authService } from '~/service/firebase'
import TwitterIcon from '@mui/icons-material/Twitter'
import { VariantType, useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

async function loginWithTwitter() {
  const provider = new TwitterAuthProvider()
  await signInWithRedirect(authService, provider)
  const result = await getRedirectResult(authService)
  console.log(result)
}

export const Register: React.FC = wrapError(() => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant })
  }

  async function register(email: string, password: string) {
    if (email === '' || password === '')
      return handleClickVariant('error', '이메일과 비밀번호를 입력해주세요')()
    try {
      const user = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      )
      updateProfile(user.user, {
        displayName: email.split('@')[0],
      })
      await sendEmailVerification(user.user)
      Swal.fire({
        title: '인증 메일을 보냈습니다',
        text: '메일 인증을 완료하셔야 로그인이 가능합니다',
        icon: 'success',
        confirmButtonText: '확인',
      })
      await signOut(authService)
      navigate('/auth')
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        handleClickVariant('error', '이미 사용중인 이메일입니다')()
      } else if (error.code === 'auth/invalid-email') {
        handleClickVariant('error', '이메일 형식이 올바르지 않습니다')()
      } else if (error.code === 'auth/weak-password') {
        handleClickVariant('error', '비밀번호는 6자 이상이어야 합니다')()
      } else {
        handleClickVariant('error', '알 수 없는 오류입니다')()
      }
    }
  }

  return (
    <Box sx={{ width: '35vh', alignItems: 'center', mt: '3' }}>
      <Grid container spacing={2} mt={3}>
        <Typography variant="h5" sx={{ width: '100%', textAlign: 'center' }}>
          회원가입
        </Typography>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="이메일"
            variant="outlined"
            type="email"
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
        onClick={() => register(email, password)}
      >
        가입
      </Button>
      <Divider sx={{ mt: 3 }}>또는</Divider>
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
