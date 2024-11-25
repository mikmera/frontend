import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { fetcher } from '~/util'

interface NicknameEditorProps {
	initialNickname: string
	onNicknameChange: (newNickname: string) => void
}

export const NicknameEditor: React.FC<NicknameEditorProps> = ({
	initialNickname,
	onNicknameChange
}) => {
	const [displayName, setDisplayName] = useState(initialNickname)

	const handleNicknameChange = async () => {
		try {
			await fetcher(`/v1/users/profile?username=${displayName}`)
			onNicknameChange(displayName)
		} catch {
			Swal.fire({
				icon: 'error',
				title: '닉네임 변경 실패',
				text: '이미 존재하거나 사용할 수 없는 닉네임입니다.'
			})
		}
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={7}>
				<TextField
					label="닉네임"
					value={displayName}
					variant="standard"
					fullWidth
					onChange={(e) => setDisplayName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={5}>
				<Button variant="contained" fullWidth onClick={handleNicknameChange}>
					닉네임 변경
				</Button>
			</Grid>
		</Grid>
	)
}
