'use client'

import { CssBaseline } from '@mui/material'
import './globals.css'

export default function RootLayout({
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
