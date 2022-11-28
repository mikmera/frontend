import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { useCurrentDexItem } from './context'
import { Bar } from 'react-chartjs-2'
import { StatKey } from '~/types'
import { ChartData, ChartOptions } from 'chart.js'

const statLabels: Record<StatKey, [string, string]> = {
  hp: ['#EA3323', '체력'],
  atk: ['#E18644', '공격'],
  def: ['#F2D154', '방어'],
  spa: ['#708FE9', '특공'],
  spd: ['#8BC660', '특방'],
  spe: ['#E66388', '스핏'],
}

const statOptions: ChartOptions = {
  responsive: true,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      position: 'right',
    },
  },
  maintainAspectRatio: false,
}

const StatsArea: React.FC = () => {
  const item = useCurrentDexItem()

  const data: ChartData<'bar', number[]> = React.useMemo(() => {
    return {
      datasets: Object.entries(statLabels).map(([key, [color, value]]) => ({
        data: [item.pokemon.stats[key as StatKey]],
        label: value,
        backgroundColor: color,
      })),
      labels: ['스탯'],
    }
  }, [item.pokemon.stats])

  return (
    <Box sx={{ minHeight: 180, p: 1 }}>
      <Bar height="100%" data={data} options={statOptions} />
    </Box>
  )
}

const DetailSection: React.FC<PropsWithChildren<{ title: string }>> = ({
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
        <DetailSection title="종족값 분배">
          <StatsArea />
        </DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="기술">ㅁㄴㅇㄹㅁㄴㅇㄹ</DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="성격">ㅁㄴㅇㄹㅁㄴㅇㄹ</DetailSection>
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
        <DetailSection title="테라스탈 타입">ㅁㄴㅇㄹㅁㄴㅇㄹ</DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="지닌 물건">ㅁㄴㅇㄹㅁㄴㅇㄹ</DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="특성">ㅁㄴㅇㄹㅁㄴㅇㄹ</DetailSection>
      </Grid>
    </Grid>
  )
}
