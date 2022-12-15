import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { Input, FormControl, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import searchIcon from '~/assets/images/search.svg'
import { SetCard } from './SetsCard'
import { useSetsContext } from '~/layouts/sets/context'

export const SetsView: React.FC = wrapError(() => {
  const { data, update } = useSetsContext()

  const rendering = () => {
    const result = []
    if (!data.sets) return null

    for (let i = 0; i < data.sets?.length; i++) {
      result.push(
        <Grid
          xs={6}
          md={2}
          mdOffset={0}
          sx={{ minWidth: '350px', maxWidth: '400px' }}
        >
          <SetCard data={data.sets[i]} />
        </Grid>
      )
    }
    return result
  }

  return (
    <Box>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        mt={4}
        mb={4}
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
      <Box>
        <Grid
          container
          spacing={3}
          sx={{
            flexGrow: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 0,
          }}
        >
          {rendering()}
        </Grid>
      </Box>
    </Box>
  )
})
