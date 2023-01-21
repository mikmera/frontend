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

const SetsLayout = wrapSuspense(
  lazy(() => import('./layouts/sets').then((x) => ({ default: x.SetsLayout })))
)

const SetsAutoLayout = wrapSuspense(
  lazy(() =>
    import('./layouts/sets').then((x) => ({ default: x.AutoCompleteLayout }))
  )
)

const SetsView = wrapSuspense(
  lazy(() => import('./routes/sets').then((x) => ({ default: x.SetsView })))
)

const Calculator = wrapSuspense(
  lazy(() => import('./routes/calc').then((x) => ({ default: x.Main })))
)

const Auth = wrapSuspense(
  lazy(() => import('./routes/auth').then((x) => ({ default: x.Main })))
)

const Register = wrapSuspense(
  lazy(() =>
    import('./routes/auth/register').then((x) => ({ default: x.Register }))
  )
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
        <Route element={<SetsLayout />}>
          <Route path="sample" element={<SetsView />} />
        </Route>
        <Route element={<SetsAutoLayout />}>
          <Route path="sample/:mode" element={<SetsView />} />
        </Route>
        <Route path="loading" element={<Loading />} />
        <Route path="calc" element={<Calculator />} />
        <Route path="auth" element={<Auth />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
})
