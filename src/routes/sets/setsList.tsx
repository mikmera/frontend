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

  const [ref, inView] = useInView()
  const [loading, setLoading] = React.useState(false)

  const SearchFilter = data.result?.filter((item) => {
    if (!data.type || data.type === 'all') return true
    else return item.type?.[0] === data.type
  })

  React.useEffect(() => {
    if (inView && !loading) {
      if (data.sets?.length === data.count) return
      setLoading(true)
      fetcher(
        apiUrl(
          `/v1/sets?offset=${data.sets?.length ?? 0 + 1}&type=${data.type}`,
        ),
      ).then((res) => {
        update((v) => ({
          ...v,
          sets: [...(v.sets ?? []), ...res.sets],
        }))
        setLoading(false)
      })
    }
  }, [inView, loading])

  React.useEffect(() => {
    setLoading(true)
    fetcher(
      apiUrl(`/v1/sets?offset=${data.sets?.length ?? 0 + 1}&type=${data.type}`),
    ).then((res) => {
      update((v) => ({
        ...v,
        sets: res.sets,
        count: res.count,
      }))
      setLoading(false)
    })
  }, [data.type])

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
      ) : data.query && data.result?.length !== 0 ? (
        SearchFilter?.map((item, index) => (
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
