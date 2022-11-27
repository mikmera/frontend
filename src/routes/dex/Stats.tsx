import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const StatSection: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Paper sx={{ mt: 1 }} variant="outlined">
        {children}
      </Paper>
    </Box>
  )
}

export const DexStats: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <StatSection title="종족값 분배">ㅁㄴㅇㄹㅁㄴㅇㄹ</StatSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <StatSection title="기술">ㅁㄴㅇㄹㅁㄴㅇㄹ</StatSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <StatSection title="성격">ㅁㄴㅇㄹㅁㄴㅇㄹ</StatSection>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          ㅁㄴㅇㄹㅁㄴㅇㄹ
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          ㅁㄴㅇㄹㅁㄴㅇㄹ
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <StatSection title="테라스탈 타입">ㅁㄴㅇㄹㅁㄴㅇㄹ</StatSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <StatSection title="지닌 물건">ㅁㄴㅇㄹㅁㄴㅇㄹ</StatSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <StatSection title="특성">ㅁㄴㅇㄹㅁㄴㅇㄹ</StatSection>
      </Grid>
    </Grid>
  )
}
