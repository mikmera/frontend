import React, { PropsWithChildren } from 'react'
import { useCurrentDexItem } from './context'
import { Bar } from 'react-chartjs-2'
import { StatKey } from '~/types'
import { ChartData, ChartOptions } from 'chart.js'
import { apiUrl } from '~/util'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { motion } from 'framer-motion'
import QuestionMark from '@mui/icons-material/QuestionMark'
import { GoogleAdsense } from '~/components/GoogleAdsense'

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

const StatSection: React.FC = () => {
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
    <Box sx={{ height: '100%', p: 1 }}>
      <Bar height="100%" data={data} options={statOptions} />
    </Box>
  )
}

const MotionList = motion(List)
const MotionListItem = motion(ListItem)

const MoveSection: React.FC = () => {
  const item = useCurrentDexItem()

  return (
    <MotionList
      transition={{ staggerChildren: 0.1 }}
      sx={{ height: '100%', overflowY: 'scroll', py: 0 }}
    >
      {item.moves.map((x, i) => (
        <MotionListItem
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              alt={x.type || '?'}
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(`/v1/sprites/types/${x.type}.svg`)}
            />
          </ListItemAvatar>
          <ListItemText primary={x.name} secondary={`${x.usage}%`} />
        </MotionListItem>
      ))}
    </MotionList>
  )
}

const NatureSection: React.FC = () => {
  const item = useCurrentDexItem()
  console.log(item.natures)
  return (
    <MotionList
      transition={{ staggerChildren: 0.1 }}
      sx={{ height: '100%', overflowY: 'scroll', py: 0 }}
    >
      {item.natures.map((x, i) => (
        <MotionListItem
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ListItemAvatar>
            <Avatar>
              <QuestionMark />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={x.name} secondary={`${x.usage}%`} />
        </MotionListItem>
      ))}
    </MotionList>
  )
}

const TerastalizeSection: React.FC = () => {
  const item = useCurrentDexItem()

  return (
    <MotionList
      transition={{ staggerChildren: 0.1 }}
      sx={{ height: '100%', overflowY: 'scroll', py: 0 }}
    >
      {item.terastalize.map((x, i) => (
        <MotionListItem
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              alt={x.type}
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(`/v1/sprites/types/${x.type}.svg`)}
            />
          </ListItemAvatar>
          <ListItemText primary={x.type} secondary={`${x.usage}%`} />
        </MotionListItem>
      ))}
    </MotionList>
  )
}

const ItemSection: React.FC = () => {
  const item = useCurrentDexItem()

  return (
    <MotionList
      transition={{ staggerChildren: 0.1 }}
      sx={{ height: '100%', overflowY: 'scroll', py: 0 }}
    >
      {item.items.map((x, i) => (
        <MotionListItem
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              alt={x.name || '?'}
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(`/v1/sprites/items/${x.name}`)}
            />
          </ListItemAvatar>
          <ListItemText primary={x.name} secondary={`${x.usage}%`} />
        </MotionListItem>
      ))}
    </MotionList>
  )
}

const AbilitiesSection: React.FC = () => {
  const item = useCurrentDexItem()
  const type = (typeN: string) => {
    switch (typeN) {
      case 'hidden':
        return { children: '숨' }
      case 'normal':
      default:
        return { children: '일' }
    }
  }
  return (
    <MotionList
      transition={{ staggerChildren: 0.1 }}
      sx={{ height: '100%', overflowY: 'scroll', py: 0 }}
    >
      {item.abilities.map((x, i) => (
        <MotionListItem
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ListItemAvatar>
            <Avatar {...type(x.type)} />
          </ListItemAvatar>
          <ListItemText primary={x.name} secondary={`${x.usage}%`} />
        </MotionListItem>
      ))}
    </MotionList>
  )
}

const DetailSection: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">{title}</Typography>
      <Paper sx={{ mt: 1, flexGrow: 1, height: 240 }} variant="outlined">
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
          <StatSection />
        </DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="기술">
          <MoveSection />
        </DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="성격">
          <NatureSection />
        </DetailSection>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <GoogleAdsense />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <GoogleAdsense />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="테라스탈 타입">
          <TerastalizeSection />
        </DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="지닌 물건">
          <ItemSection />
        </DetailSection>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DetailSection title="특성">
          <AbilitiesSection />
        </DetailSection>
      </Grid>
    </Grid>
  )
}
