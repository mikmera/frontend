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
import { MainContextData } from './context'
import { fetcher } from './util'

export default function ToggleColorMode() {
  const [cookies] = useCookies(['theme', 'Authorization'])
  const [data, setData] = React.useState<MainContextData>({
    theme: 'light',
    user: null,
  })

  const isDarkModeEnabled = cookies.theme
    ? cookies.theme === 'dark'
    : useMediaQuery('(prefers-color-scheme: dark)')

  React.useEffect(() => {
    if (isDarkModeEnabled) {
      setData((v) => ({ ...v, theme: 'dark' }))
    } else {
      setData((v) => ({ ...v, theme: 'light' }))
    }
  }, [isDarkModeEnabled])

  React.useEffect(() => {
    if (!cookies.Authorization) return setData((v) => ({ ...v, user: null }))
    fetcher('/v1/auth/@me')
      .then((res) => {
        setData((v) => ({ ...v, user: res }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [cookies.Authorization])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: data.theme,
        },
      }),
    [data.theme],
  )

  return (
    <MainContext.Provider
      value={{
        theme: data.theme,
        user: data.user,
        update: setData,
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
  <ToggleColorMode />,
)
