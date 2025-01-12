import { createTheme, Theme, useMediaQuery } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'

export function useThemeMode(): { theme: Theme; toggleThemeMode: () => void } {
	const [cookies, setCookie] = useCookies(['theme'])

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
		cookies.theme ? cookies.theme === 'dark' : prefersDarkMode
	)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: isDarkModeEnabled ? 'dark' : 'light'
				}
			}),
		[isDarkModeEnabled]
	)

	const toggleThemeMode = useCallback(() => {
		setIsDarkModeEnabled((prevMode) => {
			const newMode = !prevMode
			setCookie('theme', newMode ? 'dark' : 'light', { path: '/' })
			return newMode
		})
	}, [setCookie])

	return { theme, toggleThemeMode }
}
