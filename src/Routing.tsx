import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Main } from './routes/main'
import { NotFound } from './routes/notfound'

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
