import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { Input, FormControl, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import searchIcon from '~/assets/images/search.svg'
import { useSetsContext } from '~/layouts/sets/context'
import { Spinner } from '~/components/Spinner'
import { SetCard } from '~/routes/sets/Setcard'

export const SetsView: React.FC = wrapError(() => {
  const { data } = useSetsContext()

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
          {data.sets?.length === 0 ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </Box>
          ) : (
            // <Virtuoso
            //   style={{ height: '400px' }}
            //   data={data.sets ?? []}
            //   itemContent={(index, item) => (
            //     <Grid
            //       xs={6}
            //       md={2}
            //       mdOffset={0}
            //       sx={{ minWidth: '350px', maxWidth: '400px' }}
            //       key={index}
            //     >
            //       <SetCard item={item} key={index} />
            //     </Grid>
            //   )}
            // ></Virtuoso>
            data.sets?.map((item, index) => (
              <Grid
                xs={6}
                md={2}
                mdOffset={0}
                sx={{ minWidth: '350px', maxWidth: '400px' }}
                key={index + 10}
              >
                <SetCard item={item} key={index} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  )
})
