import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { SpeedDial } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SetsList } from './setsList'
import { Link, useParams } from 'react-router-dom'
import { CreateSets } from './createSets'

export const SetsView: React.FC = wrapError(() => {
  const params = useParams<'mode'>()

  return (
    <Box mt={5}>
      <Link to="/sample/create">
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<AddIcon />}
        />
      </Link>
      {params.mode === 'create' ? <CreateSets /> : <SetsList />}
    </Box>
  )
})
