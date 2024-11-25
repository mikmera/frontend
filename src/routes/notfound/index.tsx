import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { ErrorPage } from '~/components/ErrorPage'

export const NotFound: React.FC = wrapError(() => {
	return (
		<Box>
			<ErrorPage code="404" />
		</Box>
	)
})
