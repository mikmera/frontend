import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { Outlet } from 'react-router-dom'
import useSWR from 'swr'
import { wrapError } from '~/components/ErrorBoundary'
import { fetcher } from '~/util'
import { SetsContextData, SetsLayoutContext } from './context'
import { SearchBar, SearchFilters } from './SearchFilters'

export const SetsLayout: React.FC = wrapError(() => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))

	const [data, setData] = React.useState<SetsContextData>({
		sets: [],
		result: [],
		type: 'all',
		query: '',
		count: 0
	})

	const { data: sets } = useSWR(`/v1/sets?offset=${0}&type=${data.type}`, fetcher)

	React.useEffect(() => {
		setData((v) => ({ ...v, type: 'all' }))
	}, [])

	React.useEffect(() => {
		if (!sets) return
		if (data.sets?.length === sets.count) return

		setData((v) => ({
			...v,
			sets: sets.sets,
			count: sets.count
		}))
	}, [sets])

	return (
		<SetsLayoutContext.Provider
			value={{
				data,
				update: setData
			}}
		>
			<Box sx={{ height: '100%' }}>
				<Box
					sx={{
						marginLeft: isMobile ? 0 : '20px',
						marginRight: isMobile ? 0 : '20px',
						height: '100%'
					}}
				>
					<SearchBar />
					<SearchFilters />
					<Outlet />
					<Toolbar />
				</Box>
			</Box>
		</SetsLayoutContext.Provider>
	)
})
