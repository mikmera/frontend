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
import CardActions from '@mui/material/CardActions'
import { PokemonSets, Stats, Moves, StatKey } from '~/types'

export const SetCard: React.FC<{ item: PokemonSets; key: number }> = ({
  item,
  key,
}: {
  item: PokemonSets
  key: number
}) => {
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
    <Card sx={{ minWidth: '330px', maxWidth: '400px' }} key={key}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.name}
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
        </Typography>
        <Avatar
          sx={{ float: 'right', width: 32, height: 32 }}
          imgProps={{ crossOrigin: 'anonymous' }}
          src={apiUrl(`/v1/sprites/items/${item.item.id}`)}
        />
        <Typography variant="h5" component="div" sx={{ wordBreak: 'keep-all' }}>
          {item.pokemon.locales.ko}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          @{item.item.locales.ko}
        </Typography>
        <Typography variant="body2">
          특성: {item.ability.locales.ko}
          <br />
          성격: {item.nature.locales.ko}
          <br />
          개체값: {getIV(item.ivs)}
          <br />
          노력치: {getEV(item.evs)}
        </Typography>
        <Typography variant="body2">
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ width: '100%', textAlign: 'left' }} size="small">
              <TableBody>
                {item.moves.map((move: Moves) => (
                  <TableRow key={move.id}>
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
                        src={apiUrl(
                          `/v1/sprites/Movetypes/${move.category}.png`
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">자세히 보기</Button>
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
