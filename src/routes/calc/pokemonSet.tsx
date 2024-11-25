import {
	Autocomplete,
	Box,
	Checkbox,
	LinearProgress,
	MenuItem,
	Select,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import { HPBar } from '~/components/calculator/HealthBar'
import { wrapError } from '~/components/ErrorBoundary'
import { MoveSelector } from '~/components/setsCreate/MoveSelector'
import { PokemonCalcSet } from '~/types'
import { ClacPokemonSet, status, teratypes, types } from './constant'

export const PokemonSet = wrapError(() => {
	const [pokemon, setpokemon] = React.useState<PokemonCalcSet>(new ClacPokemonSet())

	return (
		<Box
			sx={{
				backgroundColor: '#f5f5f5',
				borderRadius: 1,
				padding: 1,
				width: 400
			}}
		>
			<Grid container spacing={0.5}>
				<Grid xs={10}>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={[{ label: '푸린' }, { label: '푸크린' }, { label: '푸푸린' }]}
						sx={{ width: 'auto' }}
						renderInput={(params) => <TextField {...params} label="포켓몬" variant="standard" />}
					/>
				</Grid>
				<Grid xs={2}>
					<TextField
						id="standard-basic"
						label="레벨"
						variant="standard"
						value={pokemon.level}
						onChange={(e) => {
							const level = parseInt(e.target.value) || 0
							setpokemon({
								...pokemon,
								level: level > 100 ? 100 : level < 1 ? 1 : level
							})
						}}
					/>
				</Grid>
				<Grid xs={2}>
					<p style={{ position: 'relative', top: -10 }}>타입</p>
				</Grid>
				<Grid xs={5}>
					<Select variant="standard" sx={{ width: '100%' }} label="타입">
						{types.map((type, i) => (
							<MenuItem key={i} value={i}>
								{type.name}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid xs={5}>
					<Select variant="standard" sx={{ width: '100%' }} label="타입">
						{types.map((type, i) => (
							<MenuItem key={i} value={i}>
								{type.name}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}>테라</p>
				</Grid>
				<Grid xs={8} sx={{ marginTop: -3 }}>
					<Select variant="standard" sx={{ width: '100%' }} label="타입">
						{teratypes.map((type, i) => (
							<MenuItem key={i} value={i}>
								{type.name}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<Checkbox value={pokemon.terastalize.enabled} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -2 }}>
					<p style={{ position: 'relative', top: -10 }}>성별</p>
				</Grid>
				<Grid xs={10} sx={{ marginTop: -2, marginBottom: 3 }}>
					<ToggleButtonGroup
						size="small"
						aria-label="outlined primary button group"
						value={pokemon.gender}
						onChange={(event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
							console.log(event)
							setpokemon({
								...pokemon,
								gender: newAlignment as any
							})
						}}
					>
						<ToggleButton value="N">무성</ToggleButton>
						<ToggleButton value="M">수컷</ToggleButton>
						<ToggleButton value="F">암컷</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
				{/* 개체값표 */}
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}></p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}>종족값</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}>개체값</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}>노력치</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}>실능치</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -10 }}>랭크업</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -15 }}>HP</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -3 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={4} sx={{ marginTop: -3 }}>
					<p style={{ position: 'relative', top: -15 }}>100</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>공격</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>100</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<select style={{ width: 50 }}>
						{[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
							<option key={i} value={i}>
								{i > 0 ? `+${i}` : i}
							</option>
						))}
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>방어</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>100</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<select style={{ width: 50 }}>
						{[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
							<option key={i} value={i}>
								{i > 0 ? `+${i}` : i}
							</option>
						))}
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>특공</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>100</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<select style={{ width: 50 }}>
						{[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
							<option key={i} value={i}>
								{i > 0 ? `+${i}` : i}
							</option>
						))}
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>특방</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>100</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<select style={{ width: 50 }}>
						{[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
							<option key={i} value={i}>
								{i > 0 ? `+${i}` : i}
							</option>
						))}
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>스핏</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<input type="text" style={{ width: 50 }} />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>100</p>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<select style={{ width: 50 }}>
						{[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
							<option key={i} value={i}>
								{i > 0 ? `+${i}` : i}
							</option>
						))}
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>성격</p>
				</Grid>
				<Grid xs={10} sx={{ marginTop: -4 }}>
					<select style={{ width: 150 }}>
						<option value="조심">조심 (특공+, 공격-)</option>
						<option value="명랑">명랑 (스핏+, 특공-)</option>
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>특성</p>
				</Grid>
				<Grid xs={10} sx={{ marginTop: -4 }}>
					<select style={{ width: 150 }}>
						<option value="적응력">곡예</option>
					</select>
					<input type="checkbox" name="xxx" value="yyy" />
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>지닌물건</p>
				</Grid>
				<Grid xs={10} sx={{ marginTop: -4 }}>
					<select style={{ width: 150 }}>
						<option value="조심">구애 쪼리핑</option>
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>상태이상</p>
				</Grid>
				<Grid xs={10} sx={{ marginTop: -4 }}>
					<select
						style={{ width: 150 }}
						onChange={(e) =>
							setpokemon({
								...pokemon,
								status: {
									name: e.target.value as any,
									BadlyPoisonedTurns: 0
								}
							})
						}
					>
						{status.map((value, i) => (
							<option key={i} value={value.name}>
								{value.ko}
							</option>
						))}
					</select>
					{/* show when badly poisoned */}
					<select
						style={{
							width: 60,
							display: pokemon.status.name === 'Badly Poisoned' ? 'inline' : 'none'
						}}
					>
						{[...Array(15)].map((_, i) => (
							<option key={i} value={i + 1}>
								{i + 1} / 16
							</option>
						))}
					</select>
				</Grid>
				<Grid xs={2} sx={{ marginTop: -4 }}>
					<p style={{ position: 'relative', top: -15 }}>소금절이</p>
				</Grid>
				<Grid xs={10} sx={{ marginTop: -4 }}>
					<input
						type="checkbox"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setpokemon({
								...pokemon,
								saltCure: e.target.checked
							})
						}}
					/>
				</Grid>
				<HPBar pokemon={pokemon} setpokemon={setpokemon} />
				<Grid xs={12} sx={{ marginTop: -3 }}>
					<LinearProgress
						variant="determinate"
						value={pokemon.currentHp.percent}
						color={
							pokemon.currentHp.percent > 50
								? 'success'
								: pokemon.currentHp.percent > 25
									? 'warning'
									: 'error'
						}
					/>
				</Grid>
				<MoveSelector
					moves={[
						{
							label: '풀묶기',
							type: 'Grass'
						},
						{
							label: '뿔찌르기',
							type: 'Normal'
						}
					]}
					moveList={[]}
					setMove={function (value: React.SetStateAction<{ label: string; type: string }[]>): void {
						throw new Error('Function not implemented.')
					}}
					disabled={false}
				/>
			</Grid>
		</Box>
	)
})
