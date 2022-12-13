import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { wrapError } from './components/ErrorBoundary'
import { Main } from './routes/main'
import { wrapSuspense } from './utils/suspense'

const RootLayout = wrapSuspense(
  lazy(() => import('./layouts/root').then((x) => ({ default: x.RootLayout })))
)

const DexLayout = wrapSuspense(
  lazy(() => import('./layouts/dex').then((x) => ({ default: x.DexLayout })))
)

const DexView = wrapSuspense(
  lazy(() => import('./routes/dex').then((x) => ({ default: x.DexView })))
)

const Calculator = wrapSuspense(
  lazy(() => import('./routes/calc').then((x) => ({ default: x.Main })))
)

const NotFound = wrapSuspense(
  lazy(() =>
    import('./routes/notfound').then((x) => ({
      default: x.NotFound,
    }))
  )
)

const Loading = wrapSuspense(
  lazy(() =>
    import('./routes/InfiniteLoading').then((x) => ({
      default: x.InfiniteLoadingPage,
    }))
  )
)

export const Routing: React.FC = wrapError(() => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<DexLayout />}>
          <Route index element={<Main />} />
          <Route path="dex/:type/:id" element={<DexView />} />
        </Route>
        <Route path="loading" element={<Loading />} />
        <Route path="calc" element={<Calculator />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
})
