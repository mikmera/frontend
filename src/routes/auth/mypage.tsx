import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import { User } from 'firebase/auth'
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
    if (
      !props.user?.emailVerified &&
      props.user?.providerData[0].providerId !== 'twitter.com'
    ) {
      handleClickVariant('error', '이메일 인증이 완료되지 않았습니다')()
      signOut(authService)
    }
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
