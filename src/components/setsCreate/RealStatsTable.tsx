import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'
import { wrapError } from '../ErrorBoundary'

interface PokemonStat {
	stats: { label: string; value: number }[]
}
export const StatTable: React.FC<PokemonStat> = wrapError(({ stats: tableRows }) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ width: '100%' }} aria-label="simple table">
				<TableBody>
					{tableRows.map((row, index) =>
						index % 2 === 0 ? (
							<TableRow key={index}>
								<TableCell component="th" scope="row">
									{row.label}
								</TableCell>
								<TableCell align="right">{row.value}</TableCell>
								{index + 1 < tableRows.length && (
									<React.Fragment>
										<TableCell component="th" scope="row">
											{tableRows[index + 1].label}
										</TableCell>
										<TableCell align="right">{tableRows[index + 1].value}</TableCell>
									</React.Fragment>
								)}
							</TableRow>
						) : null
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
})
