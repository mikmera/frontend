// ToggleColorMode.tsx
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { MainContext, MainContextData } from '~/context'
import { useThemeMode } from '~/hooks/useThemeMode'
import { useUserFetch } from '~/hooks/useUserFetch'
import { Routing } from '~/Routing'

export default function ToggleColorMode() {
  const theme = useThemeMode()
  const [data, setData] = useState<MainContextData>({
    theme: theme.palette.mode,
    user: null,
  })

  useUserFetch((user) => setData((prevData) => ({ ...prevData, user })))

  return (
    <MainContext.Provider
      value={{
        theme: data.theme,
        user: data.user,
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
