import ChevronRight from '@mui/icons-material/ChevronRight'
import QuestionMark from '@mui/icons-material/QuestionMark'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import useTheme from '@mui/material/styles/useTheme'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { Link } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { wrapError } from '~/components/ErrorBoundary'
import { Spinner } from '~/components/Spinner'
import { UsageData } from '~/types/usage'
import { apiUrl, fetcher } from '~/util'
import { DexContextData, useDexContext } from './context'

const SidebarHeader: React.FC = wrapError(() => {
  const { data, update } = useDexContext()

  return (
    <>
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="main-drawer-type-select-label">룰</InputLabel>
          <Select
            onChange={(e) =>
              update((v) => ({
                ...v,
                type: e.target.value as DexContextData['type'],
              }))
            }
            label="type"
            labelId="main-drawer-type-select-label"
            value={data.type}
          >
            <MenuItem value="single">싱글배틀</MenuItem>
            <MenuItem value="double">더블배틀</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {!data.usages && (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <Spinner />
        </Box>
      )}
    </>
  )
})

const DexItem: React.FC<{ item: UsageData; index: number }> = wrapError(
  ({ item, index }) => {
    const {
      data: { type },
    } = useDexContext()

    const iconUrl = React.useMemo(
      () =>
        apiUrl(
          `/sprites/dynamic/pokemons/${item.pokemon.dexId}${
            item.pokemon.formId !== 0 ? `-${item.pokemon.formId}` : ''
          }`,
        ),
      [item.pokemon.id],
    )

    return (
      <ListItemButton component={Link} to={`/dex/${type}/${item.pokemon.id}`}>
        <Typography
          variant="body1"
          sx={{
            mr: 2,
            minWidth: 36,
          }}
        >
          #{index + 1}
        </Typography>
        <ListItemAvatar>
          <Avatar
            alt="image"
            imgProps={{ crossOrigin: 'anonymous' }}
            src={iconUrl}
            variant="rounded"
          >
            <QuestionMark />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          // primary={`#${index + 1}`}
          primary={item.pokemon.name.translations.ko ?? item.pokemon.name}
        />
      </ListItemButton>
    )
  },
)

export const MainSidebar: React.FC = () => {
  const { data, update } = useDexContext()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const loadMore = React.useCallback(async () => {
    if (data.usages?.length === data.count) return
    setLoading(true)
    const { data: usageData } = await fetcher(
      apiUrl(
        `/v1/usage?type=${data.type}&offset=${(data.usages?.length ?? 0) + 1}`,
      ),
    )
    update((v) => ({
      ...v,
      usages: [...(v.usages ?? []), ...usageData],
    }))
    setLoading(false)
  }, [data])

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar />
          <Toolbar>
            <IconButton
              onClick={() => setOpen((v) => !v)}
              sx={{
                transition: (theme) => theme.transitions.create('transform'),
                transform: `rotate(${open ? 180 : 0}deg)`,
                pointerEvents: 'all',
              }}
            >
              <ChevronRight />
            </IconButton>
          </Toolbar>
        </Box>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={!isMobile || open}
        onClose={() => setOpen(false)}
      >
        <Toolbar sx={{ width: 280 }} />
        {isMobile && (
          <>
            <Toolbar />
            <Divider />
          </>
        )}
        <Virtuoso
          endReached={loadMore}
          height="100%"
          data={data.usages ?? []}
          itemContent={(index, item) => <DexItem index={index} item={item} />}
          components={{
            Header: SidebarHeader,
          }}
        ></Virtuoso>
        {loading && (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </Box>
        )}
      </Drawer>
    </>
  )
}
