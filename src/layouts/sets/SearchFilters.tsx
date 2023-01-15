import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import { wrapError } from '~/components/ErrorBoundary'
import { FormControl, Input, InputAdornment } from '@mui/material'
import searchIcon from '~/assets/images/search.svg'
import { SetsContextData, SetsLayoutContext, useSetsContext } from './context'
import { apiUrl, fetcher } from '~/util'

export const SearchFilters: React.FC = wrapError(() => {
  const { update } = React.useContext(SetsLayoutContext)
  const [alignment, setAlignment] = React.useState('all')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
    update((v) => ({ ...v, type: newAlignment as SetsContextData['type'] }))
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="single">싱글</ToggleButton>
        <ToggleButton value="double">더블</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
})

export const SearchBar: React.FC = wrapError(() => {
  const [query, setQuery] = React.useState('')
  const { update } = useSetsContext()

  React.useEffect(() => {
    const fetchData = async () => {
      if (query === '') return
      const { sets } = await fetcher(
        apiUrl(`/v1/sets?&query=${query}&offset=0`)
      )
      if (!sets) return

      update((v) => ({ ...v, result: sets, query }))
    }
    fetchData().catch(console.error)
  }, [query])

  return (
    <Box>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        mt={6}
        mb={4}
      >
        <FormControl variant="outlined" sx={{ width: '70%' }}>
          <Input
            id="input-with-icon-adornment"
            placeholder="검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <img src={searchIcon} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Box>
  )
})
