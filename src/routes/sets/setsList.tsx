import Box from '@mui/material/Box'
import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import { useInView } from 'react-intersection-observer'
import Grid from '@mui/material/Unstable_Grid2'
import { useSetsContext } from '~/layouts/sets/context'
import { Spinner } from '~/components/Spinner'
import { SetCard } from '~/routes/sets/Setcard'
import { apiUrl, fetcher } from '~/util'

export const SetsList: React.FC = wrapError(() => {
  const { data, update } = useSetsContext()

  const filterd = data.sets?.filter((item) => item.type?.[0] === data.type)

  const [loading, setLoading] = React.useState(false)

  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView && !loading) {
      if (data.sets?.length === data.count) return
      setLoading(true)
      fetcher(
        apiUrl(
          `/v1/sets?offset=${data.sets?.length ?? 0 + 1}&type=${data.type}`
        )
      ).then((res) => {
        update((v) => ({
          ...v,
          sets: [...(v.sets ?? []), ...res.sets],
        }))
        setLoading(false)
      })
    }
  }, [inView, loading])

  return (
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
          mt={10}
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
        filterd?.map((item, index) => (
          <Grid
            xs={6}
            md={2}
            mdOffset={0}
            sx={{ minWidth: '350px', maxWidth: '400px' }}
            key={index}
            ref={ref}
          >
            <SetCard item={item} />
          </Grid>
        ))
      )}
      {loading && (
        <Box
          sx={{
            mt: 10,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Spinner />
        </Box>
      )}
    </Grid>
  )
})
