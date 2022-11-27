import { Box, CircularProgress, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { wrapError } from '~/components/ErrorBoundary'
import { useDexContext } from '~/layouts/dex/context'
import { DexContext } from './context'
import { DexHeader } from './Header'

export const DexView: React.FC = wrapError(() => {
  const { id, type } = useParams<'id' | 'type'>()
  const { data } = useDexContext()

  const item = React.useMemo(() => {
    if (!data.usages) return null

    if (data.type !== type) return false

    if (data.type !== type && !data.usages?.length) {
      return false
    }

    const matched = data.usages.find(
      (x) => x.pokemon?.id === parseInt(id as string)
    )

    if (!matched) return false

    return matched
  }, [data.usages, type, data.type, id])

  return (
    <Box sx={{ height: '100%' }}>
      {item === false ? (
        <Box>not found</Box>
      ) : item === null ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DexContext.Provider value={item}>
          <Container sx={{ mt: 4 }}>
            <DexHeader />
            <pre>
              <code>{JSON.stringify(item, null, 2)}</code>
            </pre>
          </Container>
        </DexContext.Provider>
      )}
    </Box>
  )
})
