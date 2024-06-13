import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { SpeedDial } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SetsList } from './setsList'
import { useParams } from 'react-router-dom'
import { CreateSets } from './createSets'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useMainContext } from '~/context'

export const SetsView: React.FC = wrapError(() => {
  const navigate = useNavigate()
  const params = useParams<'mode'>()
  const { user } = useMainContext()

  const handleCreate = () => {
    if (user) {
      navigate('/sample/create')
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인이 필요합니다',
        text: '부정이용을 방지하기 위해 로그인이 필요합니다',
      })
    }
  }

  return (
    <Box mt={5}>
      <SpeedDial
        icon={<AddIcon />}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        onClick={handleCreate}
      />
      {params.mode === 'create' ? <CreateSets /> : <SetsList />}
    </Box>
  )
})
