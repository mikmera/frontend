import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DexLayout } from './layouts/dex'
import { RootLayout } from './layouts/root'
import { DexView } from './routes/dex'
import { Main } from './routes/main'
import { NotFound } from './routes/notfound'

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<DexLayout />}>
          <Route index element={<Main />} />
          <Route path="dex/:id" element={<DexView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
