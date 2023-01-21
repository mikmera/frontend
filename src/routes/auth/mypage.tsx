import React from 'react'
import Swal from 'sweetalert2'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { User, sendEmailVerification } from 'firebase/auth'
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Badge,
} from '@mui/material'
import { VariantType, useSnackbar } from 'notistack'
import { signOut, updateProfile } from 'firebase/auth'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { authService, storageService } from '~/service/firebase'
import imageCompression from 'browser-image-compression'
import { useNavigate } from 'react-router-dom'

export interface Iprops {
  user: User | null
}

export const MyPage: React.FC<Iprops> = wrapError((props) => {
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>()
  const [displayName, setDisplayName] = React.useState<string | undefined>()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant })
  }

  React.useEffect(() => {
    if (props.user?.photoURL) setProfileUrl(props.user?.photoURL)
    if (props.user?.displayName) setDisplayName(props.user?.displayName)
  }, [props.user])

  React.useEffect(() => {
    const CheckEmail = async () => {
      if (!props.user) return
      if (
        !props.user?.emailVerified &&
        props.user?.providerData[0].providerId !== 'twitter.com'
      ) {
        Swal.fire({
          title: '이메일 인증이 필요합니다',
          text: '이메일 인증을 해주세요',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '인증메일 재전송',
          cancelButtonText: '로그아웃',
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (!props.user) return
            signOut(authService)
            sendEmailVerification(props.user)
              .then(() => {
                Swal.fire(
                  '인증메일이 전송되었습니다',
                  '이메일을 확인해주세요',
                  'success'
                )
              })
              .catch((error) => {
                if (error.code === 'auth/too-many-requests')
                  Swal.fire(
                    '인증메일 전송 실패',
                    '인증메일 전송 횟수가 초과되었습니다 잠시후 다시 시도해주세요',
                    'error'
                  )
                else
                  Swal.fire(
                    '인증메일 전송 실패',
                    '에러가 발생했습니다 잠시후 다시시도해주세요',
                    'error'
                  )
                signOut(authService)
              })
          } else {
            signOut(authService)
          }
        })
      }
    }
    CheckEmail().then()
  }, [props.user])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <label htmlFor="raised-button-file">
        <Avatar
          alt={props.user?.displayName || 'user'}
          src={profileUrl}
          sx={{ width: '96px', height: '96px', mt: 6 }}
        />
      </label>
      {props.user?.uid === 'CFoSqaExdkfxmBu3gr20uxZZe2K3' && (
        <Badge color="info" badgeContent={'Admin'} />
      )}
      <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
        {`${props.user?.displayName}님, 환영합니다`}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={7}>
          <TextField
            id="standard-basic"
            label="닉네임"
            value={displayName}
            variant="standard"
            sx={{ width: '100%' }}
            onChange={(e) => {
              setDisplayName(e.target.value)
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={async () => {
              try {
                if (!props.user)
                  return handleClickVariant('error', '로그인이 필요합니다')()
                if (displayName) {
                  await updateProfile(props.user, {
                    displayName,
                  })
                  handleClickVariant('success', '닉네임이 변경되었습니다')()
                  navigate('/auth')
                } else {
                  handleClickVariant('error', '닉네임을 입력해주세요')()
                }
              } catch (error) {
                handleClickVariant('error', '닉네임 변경에 실패했습니다')()
              }
            }}
          >
            닉네임 변경
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={async () => {
              signOut(authService)
              navigate('/auth')
            }}
          >
            로그아웃
          </Button>
        </Grid>
      </Grid>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={async (e) => {
          const file = e.target.files?.item(0)
          if (!props.user) return
          if (file) {
            const data = await imageCompression.getDataUrlFromFile(file)
            const storageRef = ref(storageService, `profile/${props.user?.uid}`)
            const task = await uploadString(storageRef, data, 'data_url')
            const url = await getDownloadURL(task.ref)
            setProfileUrl(url)
            await updateProfile(props.user, {
              photoURL: url,
            })
          }
        }}
      />
    </Box>
  )
})
