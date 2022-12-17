import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { Input, FormControl, InputAdornment } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import Grid from '@mui/material/Unstable_Grid2'
import searchIcon from '~/assets/images/search.svg'
import { useSetsContext } from '~/layouts/sets/context'
import { Spinner } from '~/components/Spinner'
import { SetCard } from '~/routes/sets/Setcard'
import { apiUrl, fetcher } from '~/util'

export const SetsView: React.FC = wrapError(() => {
  const { data, update } = useSetsContext()

  const [page, setPage] = React.useState(2)
  const [loading, setLoading] = React.useState(false)

  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView && !loading) {
      setPage((v) => v + 1)
      setLoading(true)
      fetcher(apiUrl(`/v1/sets?offset=${page}&type=${data.type}`)).then(
        (res) => {
          update((v) => ({
            ...v,
            sets: [...(v.sets ?? []), ...res.sets],
          }))
          setLoading(false)
        }
      )
    }
  }, [inView, loading])

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
            data.sets?.map((item, index) => (
              <Grid
                xs={6}
                md={2}
                mdOffset={0}
                sx={{ minWidth: '350px', maxWidth: '400px' }}
                key={index}
                ref={ref}
              >
                <SetCard item={item} key={index} />
              </Grid>
            ))
          )}
          {loading && (
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              <Spinner />
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  )
})
