import Box from '@mui/material/Box'
import React, { Suspense } from 'react'
import { Spinner } from '~/components/Spinner'

export function wrapSuspense<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
): React.FC<T> {
  return ((props: T) => {
    return (
      <Suspense
        fallback={
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Spinner />
          </Box>
        }
      >
        {}
        {}
        <Component {...props} />
      </Suspense>
    )
  }) as React.FC<T>
}
