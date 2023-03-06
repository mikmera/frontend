import React from 'react'
import { wrapError } from '~/components/ErrorBoundary'
import {
  Autocomplete,
  Box,
  Checkbox,
  MenuItem,
  Select,
  TextField,
  Typography,
  LinearProgress,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material'
import { PokemonCalcSet } from '~/types'

export const PokemonSet = wrapError(() => {
  const [pokemon, setpokemon] = React.useState<PokemonCalcSet>({
    pokemon: 'jigglypuff',
    level: 50,
    types: ['Normal', 'Fairy'],
    item: 'Eviolite',
    gender: 'F',
    ability: {
      name: 'Cute Charm',
      enabled: false,
    },
    nature: 'Bold',
    terastalize: {
      type: 'Fairy',
      enabled: false,
    },
    evs: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },
    ivs: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },
    realStats: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },
    rankup: {
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },
    status: {
      name: 'Healthy',
      BadlyPoisonedTurns: 0,
    },
    saltCure: false,
    currentHp: {
      value: 222,
      max: 222,
      percent: 100,
    },
  })

  const status = [
    { name: 'Healthy', ko: '상태이상 없음' },
    { name: 'Burned', ko: '화상' },
    { name: 'Paralyzed', ko: '마비' },
    { name: 'Poisoned', ko: '독' },
    { name: 'Badly Poisoned', ko: '맹독' },
    { name: 'Asleep', ko: '잠듦' },
    { name: 'Frozen', ko: '얼음' },
  ]

  const types = [
    '노말',
    '격투',
    '비행',
    '독',
    '땅',
    '바위',
    '벌레',
    '고스트',
    '강철',
    '불꽃',
    '물',
    '풀',
    '전기',
    '에스퍼',
    '얼음',
    '드래곤',
    '악',
    '페어리',
  ]

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        padding: 1,
        width: 400,
      }}
    >
      <Grid container spacing={0.5}>
        <Grid xs={10}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { label: '푸린' },
              { label: '푸크린' },
              { label: '푸푸린' },
            ]}
            sx={{ width: 'auto' }}
            renderInput={(params) => (
              <TextField {...params} label="포켓몬" variant="standard" />
            )}
          />
        </Grid>
        <Grid xs={2}>
          <TextField
            id="standard-basic"
            label="레벨"
            variant="standard"
            defaultValue={50}
            value={pokemon.level}
            onChange={(e) => {
              const level = parseInt(e.target.value) || 0
              setpokemon({
                ...pokemon,
                level: level > 100 ? 100 : level < 1 ? 1 : level,
              })
            }}
          />
        </Grid>
        <Grid xs={2}>
          <p style={{ position: 'relative', top: -10 }}>타입</p>
        </Grid>
        <Grid xs={5}>
          <Select variant="standard" sx={{ width: '100%' }} label="타입">
            {types.map((type, i) => (
              <MenuItem key={i} value={i}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={5}>
          <Select variant="standard" sx={{ width: '100%' }} label="타입">
            {types.map((type, i) => (
              <MenuItem key={i} value={i}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>테라</p>
        </Grid>
        <Grid xs={8} sx={{ marginTop: -3 }}>
          <Select variant="standard" sx={{ width: '100%' }} label="타입">
            {types.map((type, i) => (
              <MenuItem key={i} value={i}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <Checkbox value={pokemon.terastalize.enabled} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>성별</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -3 }}>
          <ToggleButtonGroup
            size="small"
            aria-label="outlined primary button group"
            value={pokemon.gender}
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newAlignment: string
            ) => {
              console.log(event)
              setpokemon({
                ...pokemon,
                gender: newAlignment as any,
              })
            }}
          >
            <ToggleButton value="N">무성</ToggleButton>
            <ToggleButton value="M">수컷</ToggleButton>
            <ToggleButton value="F">암컷</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {/* 개체값표 */}
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}></p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>종족값</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>개체값</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>노력치</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>실능치</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -10 }}>랭크업</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -15 }}>HP</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -3 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={4} sx={{ marginTop: -3 }}>
          <p style={{ position: 'relative', top: -15 }}>100</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>공격</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>100</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <select style={{ width: 50 }}>
            {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
              <option key={i} value={i}>
                {i > 0 ? `+${i}` : i}
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>방어</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>100</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <select style={{ width: 50 }}>
            {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
              <option key={i} value={i}>
                {i > 0 ? `+${i}` : i}
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>특공</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>100</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <select style={{ width: 50 }}>
            {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
              <option key={i} value={i}>
                {i > 0 ? `+${i}` : i}
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>특방</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>100</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <select style={{ width: 50 }}>
            {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
              <option key={i} value={i}>
                {i > 0 ? `+${i}` : i}
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>스핏</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <input type="text" style={{ width: 50 }} />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>100</p>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <select style={{ width: 50 }}>
            {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((i) => (
              <option key={i} value={i}>
                {i > 0 ? `+${i}` : i}
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>성격</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <select style={{ width: 150 }}>
            <option value="조심">조심 (특공+, 공격-)</option>
            <option value="명랑">명랑 (스핏+, 특공-)</option>
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>특성</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <select style={{ width: 150 }}>
            <option value="적응력">곡예</option>
          </select>
          <input type="checkbox" name="xxx" value="yyy" />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>지닌물건</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <select style={{ width: 150 }}>
            <option value="조심">구애 쪼리핑</option>
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>상태이상</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <select
            style={{ width: 150 }}
            onChange={(e) =>
              setpokemon({
                ...pokemon,
                status: {
                  name: e.target.value as any,
                  BadlyPoisonedTurns: 0,
                },
              })
            }
          >
            {status.map((value, i) => (
              <option key={i} value={value.name}>
                {value.ko}
              </option>
            ))}
          </select>
          {/* show when badly poisoned */}
          <select
            style={{
              width: 60,
              display:
                pokemon.status.name === 'Badly Poisoned' ? 'inline' : 'none',
            }}
          >
            {[...Array(15)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} / 16
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>소금절이</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <input
            type="checkbox"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setpokemon({
                ...pokemon,
                saltCure: e.target.checked,
              })
            }}
          />
        </Grid>
        <Grid xs={2} sx={{ marginTop: -4 }}>
          <p style={{ position: 'relative', top: -15 }}>현재 hp</p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <p style={{ marginTop: -1 }}>
            <input
              type="text"
              style={{ width: 50 }}
              value={pokemon.currentHp.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value =
                  isNaN(Number(e.target.value)) ||
                  Number(e.target.value) > pokemon.currentHp.max
                    ? pokemon.currentHp.max
                    : Number(e.target.value)
                setpokemon({
                  ...pokemon,
                  currentHp: {
                    value: Number(e.target.value),
                    max: pokemon.currentHp.max,
                    percent: Math.round((value / pokemon.currentHp.max) * 100),
                  },
                })
              }}
            />
            / {pokemon.currentHp.max} (
            <input
              type="text"
              style={{ width: 50 }}
              value={pokemon.currentHp.percent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const percent =
                  isNaN(Number(e.target.value)) || Number(e.target.value) > 100
                    ? 100
                    : Number(e.target.value)
                setpokemon({
                  ...pokemon,
                  currentHp: {
                    value: Math.floor(pokemon.currentHp.max * (percent / 100)),
                    max: pokemon.currentHp.max,
                    percent: percent,
                  },
                })
              }}
            />
            %)
          </p>
        </Grid>
        <Grid xs={10} sx={{ marginTop: -4 }}>
          <LinearProgress
            variant="determinate"
            value={pokemon.currentHp.percent}
            color={
              pokemon.currentHp.percent > 50
                ? 'success'
                : pokemon.currentHp.percent > 25
                ? 'warning'
                : 'error'
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
})
