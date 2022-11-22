'use client'

import { CssBaseline } from '@mui/material'
import { RootLayout } from './components/layout/RootLayout'

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
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
