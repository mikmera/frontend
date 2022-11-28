import React from 'react'
import { DexContextData, useDexContext } from './context'
import { Virtuoso } from 'react-virtuoso'
import { Usage } from '~/types'
import QuestionMark from '@mui/icons-material/QuestionMark'
import { Link } from 'react-router-dom'
import { apiUrl } from '~/util'
import { wrapError } from '~/components/ErrorBoundary'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

const SidebarHeader: React.FC = wrapError(() => {
  const { data, update } = useDexContext()

  return (
    <>
      <Box sx={{ p: 2 }}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="main-drawer-type-select-label">type</InputLabel>
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
            <MenuItem value="single">single</MenuItem>
            <MenuItem value="double">double</MenuItem>
            <MenuItem value="vgc">vgc</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {!data.usages && (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  )
})

const DexItem: React.FC<{ item: Usage; index: number }> = wrapError(
  ({ item, index }) => {
    const {
      data: { type },
    } = useDexContext()

    const iconUrl = React.useMemo(
      () =>
        apiUrl(
          `/v1/sprites/pokemon/${item.pokemon.dexId}${
            item.pokemon.formId !== 0 ? `-${item.pokemon.formId}` : ''
          }`
        ),
      [item.pokemon.id]
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
          primary={item.pokemon.locales.ko ?? item.pokemon.name}
        />
      </ListItemButton>
    )
  }
)

export const MainSidebar: React.FC = () => {
  const { data } = useDexContext()

  return (
    <Drawer variant="permanent" open>
      <Toolbar sx={{ width: 280 }} />
      <Virtuoso
        height="100%"
        data={data.usages ?? []}
        itemContent={(index, item) => <DexItem index={index} item={item} />}
        components={{
          Header: SidebarHeader,
        }}
      ></Virtuoso>
    </Drawer>
  )
}
