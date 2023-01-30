import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Badge,
  Dialog,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { apiUrl } from '~/util'
import { Spinner } from '~/components/Spinner'
import { UserRankTable } from '~/components/UserRank'
import { useMainContext } from '~/context'

export const MyPage: React.FC = wrapError(() => {
  const { user } = useMainContext()
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>()
  const [displayName, setDisplayName] = React.useState<string | undefined>()

  const [cookies, setCookie, removeCookie] = useCookies(['Authorization'])

  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (!cookies.Authorization) return navigate('/auth/login')
    if (!user) return
    setProfileUrl(user.avatarURL)
    setDisplayName(user.username)
    setLoading(false)
  }, [user, cookies.Authorization])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {loading ? (
        <Box sx={{ mt: 6 }}>
          <Spinner />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <label htmlFor="raised-button-file">
            <Avatar
              alt={'user'}
              src={profileUrl}
              imgProps={{ crossOrigin: 'anonymous' }}
              sx={{ width: '96px', height: '96px', mt: 6 }}
            />
          </label>
          {user?.role.admin && <Badge color="info" badgeContent={'Admin'} />}
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', mt: 2, display: 'flex' }}
          >
            <img
              src={apiUrl('/v1/sprites/role/9')}
              alt="role"
              style={{ width: '32px', height: '32px' }}
              crossOrigin="anonymous"
            />
            {`${user?.username} 님, 환영합니다`}
          </Typography>
          <Button variant="text" onClick={handleClickOpen}>
            회원등급 설명 보기
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <UserRankTable />
            <Button sx={{ mb: 2 }} onClick={handleClose}>
              닫기
            </Button>
          </Dialog>
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
              <Button variant="contained" sx={{ width: '100%' }}>
                닉네임 변경
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={async () => {
                  removeCookie('Authorization')
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
          />
        </Box>
      )}
    </Box>
  )
})
