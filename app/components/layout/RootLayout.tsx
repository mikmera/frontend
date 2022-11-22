import React, { PropsWithChildren } from 'react'
import { Nav } from './Nav'

export const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}
