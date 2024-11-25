import { Box, Button, Chip } from '@mui/material'
import React, { useState } from 'react'
import { Cookies } from 'react-cookie'
import pointIcon from '~/assets/images/coin.png'
import { useMainContext } from '~/context'
import { NicknameEditor } from './NicknameEditor'
import { UserRankDialog } from './UserRankDialog'

export const MyPageContent: React.FC = () => {
	const cookies = new Cookies()
	const { user, update } = useMainContext()
	const [open, setOpen] = useState(false)

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			{/* <ProfileImageUploader userId={user?.id} onUpload={setProfileUrl} /> */}
			<Button onClick={() => setOpen(true)}>회원등급 설명 보기</Button>
			<UserRankDialog open={open} onClose={() => setOpen(false)} />
			<Chip
				avatar={<img src={pointIcon} alt="points icon" />}
				label={`보유 포인트 ${user?.points}점`}
			/>
			<NicknameEditor
				initialNickname={String(user?.profile.displayName)}
				onNicknameChange={(name) =>
					update((v) => ({
						...v,
						profile: { ...v.user?.profile, displayName: name }
					}))
				}
			/>
			<Button
				onClick={() => {
					cookies.remove('Authorization')
					window.location.reload()
				}}
			>
				로그아웃
			</Button>
		</Box>
	)
}
