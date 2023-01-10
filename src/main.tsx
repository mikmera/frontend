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
import { ThemeContext } from './context'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export default function ToggleColorMode() {
  const [themes, setTheme] = React.useState<'light' | 'dark'>('light')

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
            <Routing />
          </BrowserRouter>
        </ThemeProvider>
      </React.StrictMode>
    </ThemeContext.Provider>
  )
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ToggleColorMode />
)
