import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { fetcher } from '~/util'
import { Spinner } from '~/components/Spinner'
import { setCookie } from 'react-use-cookie'
import queryString from 'query-string'

export const Callback: React.FC = wrapError(() => {
  const navigate = useNavigate()
  const { provider } = useParams()
  const { code } = queryString.parse(location.search)

  React.useEffect(() => {
    if (code) {
      fetcher(`/v1/auth/${provider}/callback?code=${code}`).then((data) => {
        setCookie('Authorization', data.token, { path: '/' })
        navigate('/auth')
        window.location.reload()
      })
    }
  }, [code])

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <Spinner />
    </Box>
  )
})
