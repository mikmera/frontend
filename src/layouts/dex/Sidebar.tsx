import {
  Avatar,
  Box,
  CircularProgress,
  Drawer,
  FormControl,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@mui/material'
import React from 'react'
import { DexContextData, useMainContext } from './context'
import { Virtuoso } from 'react-virtuoso'
import { Usage } from '~/types'
import QuestionMark from '@mui/icons-material/QuestionMark'
import { Link } from 'react-router-dom'

const SidebarHeader: React.FC = () => {
  const { data, update } = useMainContext()

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
}

const DexItem: React.FC<{ item: Usage; index: number }> = ({ item, index }) => {
  const iconUrl = React.useMemo(
    () =>
      `https://api.pokegg.online/v1/sprites/pokemon/${item.pokemon.dexId}${
        item.pokemon.formId !== 0 ? `-${item.pokemon.formId}` : ''
      }`,
    [item.pokemon.id]
  )

  return (
    <ListItemButton component={Link} to={`/dex/${item.pokemon.id}`}>
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

export const MainSidebar: React.FC = () => {
  const { data } = useMainContext()

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
