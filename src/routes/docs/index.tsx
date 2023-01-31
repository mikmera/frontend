import React from 'react'
import Box from '@mui/material/Box'
import { wrapError } from '~/components/ErrorBoundary'
import { Typography, useMediaQuery, useTheme } from '@mui/material'

export const PrivacyPolicy: React.FC = wrapError(() => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: isMobile ? '20px' : 0,
        marginRight: isMobile ? '20px' : 0,
      }}
    >
      <Typography variant="h4" sx={{ mt: 3 }}>
        개인정보 처리방침
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 3 }}>
        {'< 포케지지팀 >'}은 「개인정보보호법」 및 「정보통신망 이용 촉진 및
        정보보호 등에 관한 법률」 등 관련 법규에 의해 이용자의 개인정보를
        보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과
        같은 개인정보 처리방침을 수립하여 공개합니다.
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        <strong>1. 개인정보의 처리 목적</strong>
      </Typography>
      <Typography variant="body1" sx={{ mt: 3 }}>
        {'< 포케지지팀 >'}은 이용자로부터 아래와 같은 개인정보를 수집하고
        있습니다.
      </Typography>
    </Box>
  )
})
