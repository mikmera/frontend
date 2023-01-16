import { Box } from '@mui/material'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const Main: React.FC = wrapError(() => {
  const [calcMode, setCalcMode] = React.useState('')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setCalcMode(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={calcMode}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ mt: 4 }}
    >
      <ToggleButton value="decision">결정력 계산기</ToggleButton>
      <ToggleButton value="stamina">내구력 계산기</ToggleButton>
    </ToggleButtonGroup>
  )
})
