import { AutocompleteRenderInputParams } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React from 'react'
import { apiUrl } from '~/util'

interface Props {
	items: { label: string; id: number }[]
	setItem: React.Dispatch<React.SetStateAction<string>>
}

export const ItemAutocomplete: React.FC<Props> = ({ items, setItem }) => {
	const renderItem = (
		props: React.HTMLAttributes<HTMLLIElement>,
		option: { label: string; id: number }
	) => (
		<Box {...props} key={option.id} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
			<img
				crossOrigin="anonymous"
				loading="lazy"
				width="30"
				src={apiUrl(`/v1/sprites/items/${option.label}`)}
			/>
			{option.label}
		</Box>
	)

	const renderInput = (params: AutocompleteRenderInputParams) => (
		<TextField
			sx={{ '& > p': { color: 'red' } }}
			label="지닌물건"
			{...params}
			helperText={params.inputProps.value ? '' : '* 올바른 지닌물건을 선택해주세요'}
		/>
	)

	return (
		<Autocomplete
			id="items"
			options={items ?? []}
			sx={{ width: '100%', marginTop: '20px' }}
			renderOption={(props, option) => renderItem(props, option)}
			renderInput={(params) => renderInput(params)}
			onChange={(e, v) => {
				if (!v) return
				setItem(v.label)
			}}
		/>
	)
}
