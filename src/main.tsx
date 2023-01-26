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
import { getCookie } from 'react-use-cookie'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { ThemeContext } from './context'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { useMediaQuery } from '@mui/material'

export default function ToggleColorMode() {
  const [themes, setTheme] = React.useState<'light' | 'dark'>('light')
  const isDarkModeEnabled = getCookie('theme')
    ? getCookie('theme') === 'dark'
    : useMediaQuery('(prefers-color-scheme: dark)')

  React.useEffect(() => {
    if (isDarkModeEnabled) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [isDarkModeEnabled])

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
    <ThemeContext.Provider
      value={{
        theme: themes,
        update: setTheme,
      }}
    >
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <SnackbarProvider>
              <Routing />
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
      </React.StrictMode>
    </ThemeContext.Provider>
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
