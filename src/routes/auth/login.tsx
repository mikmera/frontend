import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { Button, Box, Typography } from '@mui/material'
// import TwitterIcon from '@mui/icons-material/Twitter'
import DiscordIcon from '~/assets/images/discord.svg'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { fetcher } from '~/util'

// async function getTwitterUrl() {
//   const response = await fetcher('/v1/auth/twitter')
//   console.log(response)
// }

export const Login: React.FC = wrapError(() => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['Authorization'])

  const DiscordUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    import.meta.env.VITE_DISCORD_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_DISCORD_REDIRECT_URI
  }&response_type=code&scope=identify%20email%20guilds`

  React.useEffect(() => {
    if (cookies.Authorization) {
      navigate('/auth/mypage')
    }
  }, [cookies])

  return (
    <Box sx={{ width: '35vh', alignItems: 'center', mt: '3' }}>
      <Typography
        variant="h5"
        sx={{ width: '100%', textAlign: 'center', mt: 3 }}
      >
        로그인
      </Typography>
      {/* <Button
        size="large"
        variant="contained"
        sx={{ width: '100%', mt: 3, bgcolor: '#1DA1F2', color: '#fff' }}
      >
        <TwitterIcon sx={{ marginRight: '10px' }} /> 트위터로 로그인
      </Button> */}
      <Button
        size="large"
        variant="contained"
        sx={{ width: '100%', mt: 3, bgcolor: '#5865F2', color: '#fff' }}
        onClick={() => (window.location.href = DiscordUrl)}
      >
        <img
          src={DiscordIcon}
          alt="discord"
          style={{ width: '20px', marginRight: '10px' }}
        />
        디스코드로 로그인
      </Button>
    </Box>
  )
})
