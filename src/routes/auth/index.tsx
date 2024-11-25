import React from 'react'
import { Login } from './login'
import { MyPage } from './mypage'
import { Callback } from './callback'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Box, useMediaQuery } from '@mui/material'
import { wrapError } from '~/components/ErrorBoundary'

export const Main: React.FC = wrapError(() => {
	const theme = useTheme()
	const { mode } = useParams()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	return (
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'center',
				marginLeft: isMobile ? 0 : '10px',
				marginRight: isMobile ? 0 : '10px'
			}}
		>
			{!mode && <MyPage />}
			{mode === 'login' && <Login />}
			{mode === 'callback' && <Callback />}
			{mode === 'mypage' && <MyPage />}
		</Box>
	)
})
