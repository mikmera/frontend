import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Moves, PokemonSets } from '~/types'
import { apiUrl } from '~/util'
import { getEV, getIV, getShowdownText } from '~/utils/getShowdownText'

export const SetCard: React.FC<{ item: PokemonSets }> = ({ item }: { item: PokemonSets }) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (
		<Card sx={{ minWidth: '330px', maxWidth: '400px' }}>
			<CardContent>
				<Avatar
					variant="rounded"
					sx={{ float: 'right', width: 72, height: 72 }}
					imgProps={{ crossOrigin: 'anonymous' }}
					src={
						item.pokemon.formId
							? apiUrl(`/v1/sprites/pokemon/${item.pokemon.dexId}-${item.pokemon.formId}`)
							: apiUrl(`/v1/sprites/pokemon/${item.pokemon.dexId}`)
					}
				/>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{item.name}
				</Typography>
				<Avatar
					variant="rounded"
					sx={{
						float: 'right',
						width: 32,
						height: 32,
						position: 'relative',
						top: -30
					}}
					imgProps={{ crossOrigin: 'anonymous' }}
					src={apiUrl(
						`/v1/sprites/teraTypes/${
							item.teratype.name[0].toUpperCase() + item.teratype.name.slice(1)
						}.png`
					)}
				/>
				<Typography variant="h5" component="div" sx={{ wordBreak: 'keep-all' }}>
					{typeof item.pokemon.locales.ko === 'string'
						? item.pokemon.locales.ko
						: typeof item.pokemon.name === 'string'
							? item.pokemon.name
							: ''}
				</Typography>
				<Avatar
					variant="rounded"
					sx={{ float: 'right', width: 32, height: 32, position: 'relative' }}
					imgProps={{ crossOrigin: 'anonymous' }}
					src={apiUrl(`/v1/sprites/items/${item.item.id}`)}
				/>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					@{item.item.locales.ko ?? item.item.name}
				</Typography>
				<Typography variant="body2">
					특성: {item.ability.locales.ko}
					<br />
					성격: {item.nature.locales.ko}
					<br />
					개체값: {getIV(item.ivs)}
					<br />
					노력치: {getEV(item.evs)}
					<br />
					테라스탈 타입: {item.teratype.locales.ko}
				</Typography>
				<TableContainer component={Paper} sx={{ width: '100%' }}>
					<Table sx={{ width: '100%', textAlign: 'left' }} size="small">
						<TableBody>
							{item.moves.map((move: Moves) => (
								<TableRow key={move.id + Math.random()}>
									<TableCell align="left" sx={{ width: '22px' }}>
										<Avatar
											variant="rounded"
											sx={{ width: 20, height: 20 }}
											imgProps={{ crossOrigin: 'anonymous' }}
											src={apiUrl(`/v1/sprites/types/${move.type}.svg`)}
										/>
									</TableCell>
									<TableCell align="left">{move.locales.ko}</TableCell>
									<TableCell>
										<Avatar
											sx={{ width: 30, height: 20 }}
											imgProps={{ crossOrigin: 'anonymous' }}
											src={apiUrl(`/v1/sprites/Movetypes/${move.category}.png`)}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
				>
					자세히 보기
				</Button>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
				>
					<pre style={{ margin: 10 }}>
						{item.description ? item.description : '아무말도 남기시지 않았습니다'}
					</pre>
				</Popover>
				<Button size="small" onClick={() => navigator.clipboard.writeText(getShowdownText(item))}>
					쇼다운 텍스트 복사
				</Button>
			</CardActions>
		</Card>
	)
}
