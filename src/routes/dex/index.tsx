import { Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

export const DexView: React.FC = () => {
  const { id } = useParams<'id'>()

  return <Box>dex view: {id}</Box>
}
