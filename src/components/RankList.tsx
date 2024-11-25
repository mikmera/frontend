import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { apiUrl } from '~/util'

interface RankListProps {
	rank: {
		src: string
		name: string
		description: string
	}
}

export const RankList: React.FC<RankListProps> = ({ rank }) => {
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar
					alt={rank.name}
					src={apiUrl(`/sprites/static/rank/${rank.src}`)}
					imgProps={{ crossOrigin: 'anonymous' }}
				/>
			</ListItemAvatar>
			<ListItemText primary={rank.name} secondary={rank.description} />
		</ListItem>
	)
}
