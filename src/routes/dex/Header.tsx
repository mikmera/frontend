import QuestionMark from '@mui/icons-material/QuestionMark'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { apiUrl } from '~/util'
import { useCurrentDexItem } from './context'

export const DexHeader: React.FC = wrapError(() => {
  const { pokemon } = useCurrentDexItem()

  const iconUrl = React.useMemo(
    () =>
      apiUrl(
        `/sprites/dynamic/pokemons/${pokemon.dexId}${
          pokemon.formId !== 0 ? `-${pokemon.formId}` : ''
        }`,
      ),
    [pokemon.id],
  )

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        alt="image"
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
        {pokemon.name.translations.ko ?? pokemon.name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {pokemon.types.map((x, i) => (
          <Tooltip title={x.nameDetails.translations.ko} key={i}>
            <Avatar
              alt={x}
              variant="rounded"
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(
                `/sprites/static/typesNew/${x.nameDetails.translations.en}.svg`,
              )}
            />
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  )
})
