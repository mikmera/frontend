// src/test/errorpage.test.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ErrorPage } from '~/components/ErrorPage'

describe('ErrorPage Component', () => {
  const theme = createTheme()
  test('navigates to home on button click', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ErrorPage code="404" />
        </ThemeProvider>
      </MemoryRouter>,
    )

    screen.getByText('홈으로 돌아가기').click()
  })
})
