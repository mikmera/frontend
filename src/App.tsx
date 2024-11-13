import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import React, { useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { MainContext, MainContextData } from '~/context'
import { useThemeMode } from '~/hooks/useThemeMode'
import { Routing } from '~/Routing'
import { fetcher } from './utils/apiClient'

export default function App() {
  const [cookies] = useCookies(['theme', 'Authorization'])
  const { theme, toggleThemeMode } = useThemeMode()
  const [data, setData] = useState<MainContextData>({
    theme: theme.palette.mode,
    user: null,
  })

  React.useEffect(() => {
    async function fetchUser() {
      if (!cookies.Authorization) return setData((v) => ({ ...v, user: null }))
      const res = await fetcher('/v1/users/@me')
      setData((v) => ({ ...v, user: res.data }))
    }
    fetchUser()
  }, [cookies.Authorization])

  return (
    <MainContext.Provider
      value={{
        theme: theme.palette.mode,
        user: data.user,
        toggleThemeMode, // 테마 모드 토글 함수 제공
        update: setData,
      }}
    >
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <CssBaseline />
          <BrowserRouter>
            <SnackbarProvider>
              <Routing />
            </SnackbarProvider>
          </BrowserRouter>
        </CookiesProvider>
      </ThemeProvider>
    </MainContext.Provider>
  )
}
