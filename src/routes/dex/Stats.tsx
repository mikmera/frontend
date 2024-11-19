import { Grid, Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ChartData, ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
import { Bar } from 'react-chartjs-2'
import AbilityCapsule from '~/assets/images/abilitycapsule.webp'
import AbilityPatch from '~/assets/images/abilitypatch.webp'
import { GoogleAdsense } from '~/components/GoogleAdsense'
import { StatKey } from '~/types'
import { apiUrl } from '~/util'
import { useCurrentDexItem } from './context'

const statLabels: Record<StatKey, [string, string]> = {
  hp: ['#EA3323', '체력'],
  atk: ['#E18644', '공격'],
  def: ['#F2D154', '방어'],
  spa: ['#708FE9', '특공'],
  spd: ['#8BC660', '특방'],
  spe: ['#E66388', '스핏'],
}

const statOptions: ChartOptions<'bar'> = {
  responsive: true,
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'rect',
      },
    },
    datalabels: {
      display: true,
      color: 'white',
      font: {
        size: 14,
      },
    },
  },
  maintainAspectRatio: false,
}

const StatSection: React.FC = () => {
  const item = useCurrentDexItem()
  const data: ChartData<'bar', number[]> = React.useMemo(() => {
    return {
      datasets: Object.entries(statLabels).map(([key, [color, value]]) => ({
        data: [item.pokemon.stats[key as StatKey] || 0], // 값이 없으면 기본값 0
        label: value,
        backgroundColor: color,
      })),
      labels: ['스탯'],
    }
  }, [item.pokemon.stats])

  return (
    <Box sx={{ height: '100%', p: 1 }}>
      <Bar
        height="100%"
        key={JSON.stringify(data)}
        data={data}
        options={statOptions}
        plugins={[ChartDataLabels]}
      />
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
        <Tooltip title={x.description.ko} key={i} followCursor>
          <MotionListItem initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={apiUrl(`/sprites/static/typesNew/${x.type}.svg`)}
                imgProps={{ crossOrigin: 'anonymous' }}
                alt={x.type || '?'}
                style={{ width: 40, height: 40, marginTop: 8 }}
              />
            </ListItemAvatar>
            <ListItemText primary={x.name} secondary={`${x.usage}%`} />
          </MotionListItem>
        </Tooltip>
      ))}
    </MotionList>
  )
}

const TeamMatesSection: React.FC = () => {
  const item = useCurrentDexItem()

  return (
    <MotionList
      transition={{ staggerChildren: 0.1 }}
      sx={{ height: '100%', overflowY: 'scroll', py: 0 }}
    >
      {item.teammates.map((x, i) => (
        <MotionListItem
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              alt={'?'}
              imgProps={{ crossOrigin: 'anonymous' }}
              src={
                x.formId === 0
                  ? apiUrl(`/sprites/dynamic/pokemons/${x.dexId}`)
                  : apiUrl(`/sprites/dynamic/pokemons/${x.dexId}-${x.formId}`)
              }
            />
            {x.types.map((x, i) => (
              <Avatar
                key={i}
                alt={x.nameDetails.translations.en}
                imgProps={{ crossOrigin: 'anonymous' }}
                src={apiUrl(
                  `/sprites/static/typesNew/${x.nameDetails.translations.en}.svg`,
                )}
                sx={{
                  position: 'absolute',
                  top: 15,
                  left: 170 + i * 20,
                  width: 20,
                  height: 20,
                  transform: 'translate(0, 0)',
                }}
              />
            ))}
          </ListItemAvatar>
          <ListItemText primary={x.name} secondary={`#${i + 1}`} />
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
              src={apiUrl(
                `/sprites/static/teraTypes/${
                  x.type[0].toUpperCase() + x.type.slice(1)
                }.png`,
              )}
            />
          </ListItemAvatar>
          <ListItemText primary={x.name} secondary={`${x.usage}%`} />
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
        <Tooltip key={i} title={x.description.ko} followCursor>
          <MotionListItem initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={apiUrl(`/sprites/static/items/${x.id}.png`)}
                imgProps={{ crossOrigin: 'anonymous' }}
                alt={x.name || '?'}
                style={{ width: 40, height: 40, marginTop: 6 }}
              />
            </ListItemAvatar>
            <ListItemText primary={x.name} secondary={`${x.usage}%`} />
          </MotionListItem>
        </Tooltip>
      ))}
    </MotionList>
  )
}

const AbilitiesSection: React.FC = () => {
  const item = useCurrentDexItem()
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
            <Avatar
              src={x.type === 'hidden' ? AbilityPatch : AbilityCapsule}
              alt={x.type === 'hidden' ? '숨' : '일'}
            />
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
        <DetailSection title="배틀팀 구성">
          <TeamMatesSection />
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
