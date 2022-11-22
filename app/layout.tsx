'use client'

import { CssBaseline } from '@mui/material'
import './global.css'

export default function AppRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  )
}
