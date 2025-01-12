import { Button, Dialog } from '@mui/material'
import React from 'react'
import { UserRankTable } from '~/components/Shared/UserRankTable'

interface UserRankDialogProps {
	open: boolean
	onClose: () => void
}

export const UserRankDialog: React.FC<UserRankDialogProps> = ({ open, onClose }) => (
	<Dialog open={open} onClose={onClose}>
		<UserRankTable />
		<Button onClick={onClose}>닫기</Button>
	</Dialog>
)
