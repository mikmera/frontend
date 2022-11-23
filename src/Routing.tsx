import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/root'
import { Main } from './routes/main'
import { NotFound } from './routes/notfound'

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
