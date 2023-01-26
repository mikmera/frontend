import React from 'react'
import { apiUrl } from '~/util'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import CardActions from '@mui/material/CardActions'
import { PokemonSets, Stats, Moves, StatKey } from '~/types'

export const SetCard: React.FC<{ item: PokemonSets }> = ({
  item,
}: {
  item: PokemonSets
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const Dictionary = {
    hp: 'H',
    atk: 'A',
    def: 'B',
    spa: 'C',
    spd: 'D',
    spe: 'S',
  }

  const getShowdownText = () => {
    const result = []
    const nature: string = item.nature.name
    const display = nature.slice(0, 1).toUpperCase() + nature.slice(1)
    result.push(`${item.pokemon.name} @ ${item.item.name}`)
    result.push(`Ability: ${item.ability.name}`)
    result.push(`Tera Type: ${item.teratype.name} `)
    result.push(`EVs: ${getEV(item.evs, true)}`)
    result.push(`${display} Nature`)
    result.push(`IVs: ${getIV(item.ivs, true)}`)
    for (const move of item.moves) {
      result.push(`- ${move.name}`)
    }
    return result.join('\n')
  }

  const getIV = (iv: Stats, type?: boolean) => {
    const result = []
    if (type) {
      for (const ikey in iv) {
        const key: StatKey = ikey as StatKey
        if (iv[key] !== 31) result.push(iv[key] + ' ' + key)
      }
      return result
    } else {
      for (const ikey in iv) {
        const key: StatKey = ikey as StatKey
        if (iv[key] === 31) result.push('V')
        else if (iv[key] === 30) result.push('U')
        else if (iv[key] === 0) result.push('Z')
        else result.push(iv[key])
      }
      return result.join('.')
    }
  }
  // ev = {hp: 252, atk: 6, def: 0, spa: 0, spd: 0, spe: 252}
  // hp = H / atk = A / def = B / spa = C / spd = D / spe = S
  // 만약 hp252 spe252 atk6 라면 HS252 A6로 표기

  const getEV = (ev: Stats, type?: boolean) => {
    const result = []
    if (type) {
      for (const ikey in ev) {
        const key: StatKey = ikey as StatKey
        if (ev[key] !== 0) result.push(ev[key] + ' ' + key)
      }
      return result.join(' / ')
    } else {
      for (const ikey in ev) {
        const key: StatKey = ikey as StatKey
        if (ev[key] !== 0) result.push(Dictionary[key] + ev[key])
      }
    }
    return result.join(' ')
  }

  return (
    <Card sx={{ minWidth: '330px', maxWidth: '400px' }}>
      <CardContent>
        <Avatar
          sx={{ float: 'right', width: 72, height: 72 }}
          imgProps={{ crossOrigin: 'anonymous' }}
          src={
            item.pokemon.formId
              ? apiUrl(
                  `/v1/sprites/pokemon/${item.pokemon.dexId}-${item.pokemon.formId}`
                )
              : apiUrl(`/v1/sprites/pokemon/${item.pokemon.dexId}`)
          }
        />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.name}
          <Avatar
            sx={{ float: 'right', width: 32, height: 32 }}
            imgProps={{ crossOrigin: 'anonymous' }}
            src={apiUrl(
              `/v1/sprites/types/${
                item.teratype.name[0].toUpperCase() +
                item.teratype.name.slice(1)
              }.svg`
            )}
          />
        </Typography>
        <Typography variant="h5" component="div" sx={{ wordBreak: 'keep-all' }}>
          {item.pokemon.locales.ko ?? item.pokemon.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Avatar
            sx={{ float: 'right', width: 32, height: 32 }}
            imgProps={{ crossOrigin: 'anonymous' }}
            src={apiUrl(`/v1/sprites/items/${item.item.id}`)}
          />
          @{item.item.locales.ko ?? item.item.name}
        </Typography>
        <Typography variant="body2">
          특성: {item.ability.locales.ko}
          <br />
          성격: {item.nature.locales.ko}
          <br />
          개체값: {getIV(item.ivs)}
          <br />
          노력치: {getEV(item.evs)}
          <br />
          테라스탈 타입: {item.teratype.locales.ko}
        </Typography>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ width: '100%', textAlign: 'left' }} size="small">
            <TableBody>
              {item.moves.map((move: Moves) => (
                <TableRow key={move.id + Math.random()}>
                  <TableCell align="left" sx={{ width: '22px' }}>
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      imgProps={{ crossOrigin: 'anonymous' }}
                      src={apiUrl(`/v1/sprites/types/${move.type}.svg`)}
                    />
                  </TableCell>
                  <TableCell align="left">{move.locales.ko}</TableCell>
                  <TableCell>
                    <Avatar
                      sx={{ width: 30, height: 20 }}
                      imgProps={{ crossOrigin: 'anonymous' }}
                      src={apiUrl(`/v1/sprites/Movetypes/${move.category}.png`)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setAnchorEl(event.currentTarget)
          }
        >
          자세히 보기
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <pre style={{ margin: 10 }}>
            {item.description
              ? item.description
              : '아무말도 남기시지 않았습니다'}
          </pre>
        </Popover>
        <Button
          size="small"
          onClick={() => navigator.clipboard.writeText(getShowdownText())}
        >
          쇼다운 텍스트 복사
        </Button>
      </CardActions>
    </Card>
  )
}
