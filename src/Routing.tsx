import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Main } from './routes/main'

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
    </Routes>
  )
}
