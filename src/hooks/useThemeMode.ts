import { createTheme, Theme, useMediaQuery } from '@mui/material'
import React from 'react'
import { useCookies } from 'react-cookie'

export function useThemeMode(): Theme {
  const [cookies] = useCookies(['theme'])
  const isDarkModeEnabled = cookies.theme
    ? cookies.theme === 'dark'
    : useMediaQuery('(prefers-color-scheme: dark)')

  return React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkModeEnabled ? 'dark' : 'light',
        },
      }),
    [isDarkModeEnabled],
  )
}
