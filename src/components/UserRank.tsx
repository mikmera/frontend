import React from 'react'
import Ranks from '~/constants/ranks'
import { Grid, List } from '@mui/material'
import { RankList } from '~/components/Ranklist'

export const UserRankTable: React.FC = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <List sx={{ width: '100%' }}>
          {Ranks.slice(0, 3).map((rank) => (
            <RankList rank={rank} />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <List sx={{ width: '100%' }}>
          {Ranks.slice(3, 6).map((rank) => (
            <RankList rank={rank} />
          ))}
        </List>
      </Grid>
    </Grid>
  )
}
