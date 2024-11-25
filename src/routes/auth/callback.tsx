import { Box } from '@mui/material'
import queryString from 'query-string'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setCookie } from 'react-use-cookie'
import { wrapError } from '~/components/ErrorBoundary'
import { Spinner } from '~/components/Spinner'
import { fetcher } from '~/util'

const styles = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center',
	marginTop: 10
}

export const Callback: React.FC = wrapError(() => {
	const navigate = useNavigate()
	const { provider } = useParams<{ provider: string }>()
	const { code } = queryString.parse(window.location.search) as {
		code?: string
	}

	React.useEffect(() => {
		if (code && provider) {
			fetcher(`/v1/auth/callback/${provider}?code=${code}`).then((res) => {
				setCookie('Authorization', res.data.token, { path: '/' })
				navigate('/auth')
				window.location.reload()
			})
		}
	}, [code, provider, navigate])

	return (
		<Box sx={styles}>
			<Spinner />
		</Box>
	)
})
