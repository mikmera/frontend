import { Grid, List } from '@mui/material'
import React from 'react'
import { RankList } from '~/components/RankList'
import Ranks from '~/constants/ranks'

export const UserRankTable: React.FC = () => {
	return (
		<Grid container spacing={0}>
			<Grid item xs={12} md={6}>
				<List sx={{ width: '100%' }}>
					{Ranks.slice(0, 3).map((rank) => (
						<RankList key={rank.src} rank={rank} />
					))}
				</List>
			</Grid>
			<Grid item xs={12} md={6}>
				<List sx={{ width: '100%' }}>
					{Ranks.slice(3, 6).map((rank) => (
						<RankList key={rank.src} rank={rank} />
					))}
				</List>
			</Grid>
			{/* <Grid item xs={12} md={6}>
        <List sx={{ width: '100%' }}>
          <RankList key={Ranks[6].src} rank={Ranks[6]} />
        </List>
      </Grid> */}
		</Grid>
	)
}
