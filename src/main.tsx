/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './Routing'
import CssBaseline from '@mui/material/CssBaseline'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import './global.scss'
import { useCookies, CookiesProvider } from 'react-cookie'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { MainContext } from './context'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { useMediaQuery } from '@mui/material'
import { fetcher } from './util'

export default function ToggleColorMode() {
  const [cookies] = useCookies(['theme', 'Authorization'])
  const [user, setUser] = React.useState(null)
  const [themes, setTheme] = React.useState<'light' | 'dark'>('light')

  const isDarkModeEnabled = cookies.theme
    ? cookies.theme === 'dark'
    : useMediaQuery('(prefers-color-scheme: dark)')

  React.useEffect(() => {
    if (isDarkModeEnabled) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [isDarkModeEnabled])

  React.useEffect(() => {
    if (!cookies.Authorization) return setUser(null)
    fetcher('/v1/auth/@me')
      .then((res) => {
        setUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cookies.Authorization])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themes,
        },
      }),
    [themes]
  )

  return (
    <MainContext.Provider
      value={{
        theme: themes,
        user: user,
        update: setTheme,
      }}
    >
      <React.StrictMode>
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
      </React.StrictMode>
    </MainContext.Provider>
  )
}

Sentry.init({
  dsn: 'https://b241ea8ae74d41c8a6314dae36afdff2@o4504570083016704.ingest.sentry.io/4504570084917248',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ToggleColorMode />
)
