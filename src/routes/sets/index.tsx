import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { Input, FormControl, InputAdornment } from '@mui/material'
import searchIcon from '~/assets/images/search.svg'

export const SetsView: React.FC = wrapError(() => {
  return (
    // center the search bar
    <Box
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      mt={4}
    >
      <FormControl variant="outlined" sx={{ width: '70%' }}>
        <Input
          id="input-with-icon-adornment"
          placeholder="검색"
          startAdornment={
            <InputAdornment position="start">
              <img src={searchIcon} />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  )
})
