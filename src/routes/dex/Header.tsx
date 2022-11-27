import QuestionMark from '@mui/icons-material/QuestionMark'
import { Avatar, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { apiUrl } from '~/util'
import { useCurrentDexItem } from './context'

export const DexHeader: React.FC = wrapError(() => {
  const { pokemon } = useCurrentDexItem()

  const iconUrl = React.useMemo(
    () =>
      apiUrl(
        `/v1/sprites/pokemon/${pokemon.dexId}${
          pokemon.formId !== 0 ? `-${pokemon.formId}` : ''
        }`
      ),
    [pokemon.id]
  )

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        sx={{
          width: 72,
          height: 72,
        }}
        variant="rounded"
        imgProps={{ crossOrigin: 'anonymous' }}
        src={iconUrl}
      >
        <QuestionMark />
      </Avatar>
      <Typography fontSize={32}>
        {pokemon.locales.ko ?? pokemon.name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {pokemon.types.map((x, i) => (
          <Tooltip title={x} key={i}>
            <Avatar
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(`/v1/sprites/types/${x}.svg`)}
            />
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  )
})
