import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ToggleColorMode from '~/pages/ToggleColorMode'
import '~/styles/global.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>,
)
