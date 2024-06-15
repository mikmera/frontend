import React from 'react'
import { apiUrl } from '~/util'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

interface RankListProps {
  rank: {
    id: number
    name: string
    description: string
  }
}

export const RankList: React.FC<RankListProps> = ({ rank }) => {
  return (
    <ListItem key={rank.id}>
      <ListItemAvatar>
        <Avatar
          alt={rank.name}
          src={apiUrl(`/v1/sprites/role/${rank.id}`)}
          imgProps={{ crossOrigin: 'anonymous' }}
        />
      </ListItemAvatar>
      <ListItemText primary={rank.name} secondary={rank.description} />
    </ListItem>
  )
}
