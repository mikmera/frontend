import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import {
  Autocomplete,
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAutoCompleteContext } from '~/layouts/sets/context'
import { apiUrl, fetcher, put } from '~/util'
import { Spinner } from '~/components/Spinner'
import { VariantType, useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '~/context'
import { getCookie } from 'react-use-cookie'

export const CreateSets: React.FC = () => {
  const navigate = useNavigate()
  const { data } = useAutoCompleteContext()

  const { user } = useMainContext()

  React.useEffect(() => {
    const token = getCookie('Authorization')
    if (!token) {
      navigate('/auth')
    }
  }, [])

  const [pokemons] = React.useState<
    [
      {
        label: string
        id: number
        stats: {
          hp: number
          atk: number
          def: number
          spa: number
          spd: number
          spe: number
        }
      }
    ]
  >([
    {
      label: '',
      id: 0,
      stats: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    },
  ])
  const [items] = React.useState<[{ label: string; id: number }]>([
    { label: '', id: 0 },
  ])
  const [natures] = React.useState<
    [
      {
        label: string
        name: string
        correction: {
          atk: number
          def: number
          spa: number
          spd: number
          spe: number
        }
      }
    ]
  >([
    {
      label: '',
      name: '',
      correction: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 },
    },
  ])
  const [moves] = React.useState<[{ label: string; type: string }]>([
    { label: '쪼리핑펀치', type: 'Normal' },
  ])

  const [moveList, setMove] = React.useState<{ label: string; type: string }[]>(
    [{ label: '', type: '' }]
  )
  const [teraTypes] = React.useState<{ label: string; type: string }[]>([
    { label: '노말', type: 'Normal' },
  ])

  const [disabled, setDisabled] = React.useState<boolean>(true)
  const [pokemonDict] = React.useState<string[]>([])
  const [abilities] = React.useState<[{ label: string }]>([{ label: '' }])
  const [pokemon, setPokemon] = React.useState<string>('미싱노')
  const [item, setItem] = React.useState<string>('')
  const [nature, setNature] = React.useState<string>('')
  const [ability, setAbility] = React.useState<string>('')
  const [setsName, setName] = React.useState<string>('')
  const [Effort, setEffort] = React.useState<number[]>([0, 0, 0, 0, 0, 0])
  const [Ivs, setIvs] = React.useState<number[]>([31, 31, 31, 31, 31, 31])
  const [type, setType] = React.useState<'single' | 'double'>('single')
  const [teratype, setTeraType] = React.useState<string>()
  const [waitUpload, setWaitUpload] = React.useState<boolean>(false)

  const [realStats, setRealStats] = React.useState<number[]>([0, 0, 0, 0, 0, 0])

  const { enqueueSnackbar } = useSnackbar()

  const handleHp = () => {
    if (Effort[0] > 252) {
      setEffort((v) => [252, v[1], v[2], v[3], v[4], v[5]])
    } else if (Effort[0] < 0) {
      setEffort((v) => [0, v[1], v[2], v[3], v[4], v[5]])
    }
    if (Effort.reduce((a, b) => a + b) > 508) {
      const over = 508 - Effort.reduce((a, b) => a + b)
      setEffort((v) => [v[0] + over, v[1], v[2], v[3], v[4], v[5]])
    }
  }

  const handleHpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffort((v) => [Number(event.target.value), v[1], v[2], v[3], v[4], v[5]])
  }

  const handleHPSlider = (event: Event, newValue: number | number[]) => {
    setEffort((v) => [newValue as number, v[1], v[2], v[3], v[4], v[5]])
  }

  const handleAtk = () => {
    if (Effort[1] > 252) {
      setEffort((v) => [v[0], 252, v[2], v[3], v[4], v[5]])
    } else if (Effort[1] < 0) {
      setEffort((v) => [v[0], 0, v[2], v[3], v[4], v[5]])
    }
    // 총합이 508 초과할경우 초과한만큼 낮춤
    if (Effort.reduce((a, b) => a + b) > 508) {
      const over = 508 - Effort.reduce((a, b) => a + b)
      setEffort((v) => [v[0], v[1] + over, v[2], v[3], v[4], v[5]])
    }
  }

  const handleAtkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffort((v) => [v[0], Number(event.target.value), v[2], v[3], v[4], v[5]])
  }

  const handleAtkSlider = (event: Event, newValue: number | number[]) => {
    setEffort((v) => [v[0], newValue as number, v[2], v[3], v[4], v[5]])
  }

  const handleDef = () => {
    if (Effort[2] > 252) {
      setEffort((v) => [v[0], v[1], 252, v[3], v[4], v[5]])
    } else if (Effort[2] < 0) {
      setEffort((v) => [v[0], v[1], 0, v[3], v[4], v[5]])
    }
    // 총합이 508 초과할경우 초과한만큼 낮춤
    if (Effort.reduce((a, b) => a + b) > 508) {
      const over = 508 - Effort.reduce((a, b) => a + b)
      setEffort((v) => [v[0], v[1], v[2] + over, v[3], v[4], v[5]])
    }
  }

  const handleDefChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffort((v) => [v[0], v[1], Number(event.target.value), v[3], v[4], v[5]])
  }

  const handleDefSlider = (event: Event, newValue: number | number[]) => {
    setEffort((v) => [v[0], v[1], newValue as number, v[3], v[4], v[5]])
  }

  const handleSpa = () => {
    if (Effort[3] > 252) {
      setEffort((v) => [v[0], v[1], v[2], 252, v[4], v[5]])
    } else if (Effort[3] < 0) {
      setEffort((v) => [v[0], v[1], v[2], 0, v[4], v[5]])
    }
    // 총합이 508 초과할경우 초과한만큼 낮춤
    if (Effort.reduce((a, b) => a + b) > 508) {
      const over = 508 - Effort.reduce((a, b) => a + b)
      setEffort((v) => [v[0], v[1], v[2], v[3] + over, v[4], v[5]])
    }
  }

  const handleSpaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffort((v) => [v[0], v[1], v[2], Number(event.target.value), v[4], v[5]])
  }

  const handleSpaSlider = (event: Event, newValue: number | number[]) => {
    setEffort((v) => [v[0], v[1], v[2], newValue as number, v[4], v[5]])
  }

  const handleSpd = () => {
    if (Effort[4] > 252) {
      setEffort((v) => [v[0], v[1], v[2], v[3], 252, v[5]])
    } else if (Effort[4] < 0) {
      setEffort((v) => [v[0], v[1], v[2], v[3], 0, v[5]])
    }
    // 총합이 508 초과할경우 초과한만큼 낮춤
    if (Effort.reduce((a, b) => a + b) > 508) {
      const over = 508 - Effort.reduce((a, b) => a + b)
      setEffort((v) => [v[0], v[1], v[2], v[3], v[4] + over, v[5]])
    }
  }

  const handleSpdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffort((v) => [v[0], v[1], v[2], v[3], Number(event.target.value), v[5]])
  }

  const handleSpdSlider = (event: Event, newValue: number | number[]) => {
    setEffort((v) => [v[0], v[1], v[2], v[3], newValue as number, v[5]])
  }

  const handleSpe = () => {
    if (Effort[5] > 252) {
      setEffort((v) => [v[0], v[1], v[2], v[3], v[4], 252])
    } else if (Effort[5] < 0) {
      setEffort((v) => [v[0], v[1], v[2], v[3], v[4], 0])
    }
    // 총합이 508 초과할경우 초과한만큼 낮춤
    if (Effort.reduce((a, b) => a + b) > 508) {
      const over = 508 - Effort.reduce((a, b) => a + b)
      setEffort((v) => [v[0], v[1], v[2], v[3], v[4], v[5] + over])
    }
  }

  const handleSpeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEffort((v) => [v[0], v[1], v[2], v[3], v[4], Number(event.target.value)])
  }

  const handleSpeSlider = (event: Event, newValue: number | number[]) => {
    setEffort((v) => [v[0], v[1], v[2], v[3], v[4], newValue as number])
  }

  const IvHpBlur = () => {
    if (Ivs[0] > 31) {
      setIvs((v) => [31, v[1], v[2], v[3], v[4], v[5]])
    } else if (Ivs[0] < 0) {
      setIvs((v) => [0, v[1], v[2], v[3], v[4], v[5]])
    }
  }

  const IvAtkBlur = () => {
    if (Ivs[1] > 31) {
      setIvs((v) => [v[0], 31, v[2], v[3], v[4], v[5]])
    } else if (Ivs[1] < 0) {
      setIvs((v) => [v[0], 0, v[2], v[3], v[4], v[5]])
    }
  }

  const IvDefBlur = () => {
    if (Ivs[2] > 31) {
      setIvs((v) => [v[0], v[1], 31, v[3], v[4], v[5]])
    } else if (Ivs[2] < 0) {
      setIvs((v) => [v[0], v[1], 0, v[3], v[4], v[5]])
    }
  }

  const IvSpaBlur = () => {
    if (Ivs[3] > 31) {
      setIvs((v) => [v[0], v[1], v[2], 31, v[4], v[5]])
    } else if (Ivs[3] < 0) {
      setIvs((v) => [v[0], v[1], v[2], 0, v[4], v[5]])
    }
  }

  const IvSpdBlur = () => {
    if (Ivs[4] > 31) {
      setIvs((v) => [v[0], v[1], v[2], v[3], 31, v[5]])
    } else if (Ivs[4] < 0) {
      setIvs((v) => [v[0], v[1], v[2], v[3], 0, v[5]])
    }
  }

  const IvSpeBlur = () => {
    if (Ivs[5] > 31) {
      setIvs((v) => [v[0], v[1], v[2], v[3], v[4], 31])
    } else if (Ivs[5] < 0) {
      setIvs((v) => [v[0], v[1], v[2], v[3], v[4], 0])
    }
  }

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant })
  }

  const Upload = async () => {
    if (waitUpload) return
    setWaitUpload(true)
    if (
      !pokemon ||
      !item ||
      !nature ||
      !ability ||
      moves[0].label == '쪼리핑펀치' ||
      !teratype
    ) {
      setWaitUpload(false)
      return handleClickVariant('error', '입력되지 않은 항목이 있습니다')()
    }
    if (Effort.reduce((a, b) => a + b) > 508) {
      setWaitUpload(false)
      return handleClickVariant('error', '노력치 총합이 508을 초과합니다')()
    }

    await put(apiUrl('/v1/sets/create'), {
      name: setsName,
      pokemonId: pokemons.find((v) => v.label == pokemon)?.id,
      itemId: items.find((v) => v.label == item)?.id,
      nature: nature,
      ability: ability,
      moves: moveList,
      evs: Effort,
      ivs: Ivs,
      type,
      teratype: teratype,
      author: user?.uid,
    })
      .then(() => {
        handleClickVariant('success', '업로드 완료')()
        navigate('/sample')
      })
      .catch(handleClickVariant('error', '에러가 발생했습니다'))
  }

  React.useEffect(() => {
    if (!data.pokemon) return
    if (pokemons.length > 2) return

    pokemons.pop()
    for (const pokemon of data.pokemon) {
      if (!pokemon.name) continue
      pokemons.push({
        label: pokemon.name,
        id: pokemon.id,
        stats: pokemon.stats,
      })
      pokemonDict.push(pokemon.name)
    }
  }, [data.pokemon])

  React.useEffect(() => {
    if (!data.items) return
    if (items.length > 2) return

    items.pop()
    for (const item of data.items) {
      if (!item.name) continue
      items.push({
        label: item.name,
        id: Number(item.id),
      })
    }
  }, [data.items])

  React.useEffect(() => {
    if (!data.natures) return

    natures.pop()
    for (const nature of data.natures) {
      if (!nature.name) continue
      natures.push({
        label: nature.name,
        name: nature.name,
        correction: nature.correction,
      })
    }
  }, [data.natures])

  React.useEffect(() => {
    if (!data.types) return

    teraTypes.pop()
    for (const type of data.types) {
      if (!type.name) continue
      teraTypes.push({
        label: type.name,
        type: type.en,
      })
    }
  }, [data.types])

  React.useEffect(() => {
    const fetchData = async () => {
      const { pokemon: data } = await fetcher(
        apiUrl(`/v1/autocomplete/pokemon/${pokemon}`)
      )
      if (!data) return

      moves.splice(0, moves.length)
      for (const move of data.moves) {
        if (moves.find((m) => m.label === move.locales.ko)) {
          continue
        } else {
          moves.push({
            label: move.locales.ko,
            type: move.Mtype,
          })
        }
      }
    }
    fetchData().catch(console.error)
  }, [pokemon])

  React.useEffect(() => {
    if (!pokemon || pokemon === '미싱노') return
    const stats = pokemons.find((v) => v.label == pokemon)?.stats
    const correction = natures.find((v) => v.label == nature)?.correction || {
      atk: 1,
      def: 1,
      spa: 1,
      spd: 1,
      spe: 1,
    }
    if (!stats) return
    const hp = Math.floor((stats.hp * 2 + Ivs[0] + Effort[0] / 4) * 0.5 + 60)
    const atk = Math.floor(
      ((stats.atk * 2 + Ivs[1] + Effort[1] / 4) * 0.5 + 5) * correction?.atk
    )
    const def = Math.floor(
      ((stats.def * 2 + Ivs[2] + Effort[2] / 4) * 0.5 + 5) * correction?.def
    )
    const spa = Math.floor(
      ((stats.spa * 2 + Ivs[3] + Effort[3] / 4) * 0.5 + 5) * correction?.spa
    )
    const spd = Math.floor(
      ((stats.spd * 2 + Ivs[4] + Effort[4] / 4) * 0.5 + 5) * correction?.spd
    )
    const spe = Math.floor(
      ((stats.spe * 2 + Ivs[5] + Effort[5] / 4) * 0.5 + 5) * correction?.spe
    )

    setRealStats([hp, atk, def, spa, spd, spe])
  }, [pokemon, nature, Ivs, Effort])

  React.useEffect(() => {
    setDisabled(pokemon === '미싱노' ? true : false)
  }, [pokemon])

  React.useEffect(() => {
    const fetchData = async () => {
      const { abilities: data } = await fetcher(
        apiUrl(`/v1/autocomplete/abilities/${pokemon}`)
      )
      if (!data) return
      abilities.splice(0, abilities.length)
      for (const ability of data) {
        abilities.push({
          label: ability.name,
        })
      }
    }
    if (pokemon === '미싱노') return
    fetchData().catch(console.error)
  }, [pokemon])

  React.useEffect(() => {
    setMove([])
    setAbility('')
  }, [pokemon])

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {!data.pokemon || !data.items ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <Grid container sx={{ width: '450px', m: 3 }}>
          <Grid item xs={12} mb={4}>
            {/*[{(종족값 * 2) + 개체값 + (노력치/4)} * 1/2 ] + 10 + 50(레벨)*/}
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              샘플 등록하기
            </Typography>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                샘플 유형
              </FormLabel>
              <RadioGroup
                row
                value={type}
                onChange={(e) => {
                  setType(e.target.value as 'single' | 'double')
                }}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="싱글"
                />
                <FormControlLabel
                  value="double"
                  control={<Radio />}
                  label="더블"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="standard-basic"
              label="샘플 이름"
              value={setsName}
              onChange={(e) => {
                setName(e.target.value)
              }}
              variant="standard"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={4}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: 'auto',
                marginTop: '20px',
              }}
              imgProps={{ crossOrigin: 'anonymous' }}
              src={apiUrl(`/v1/sprites/pokemon/${pokemon}`)}
            />
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              id="pokemons"
              options={pokemons}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  sx={{ '& > p': { color: 'red' } }}
                  label="포켓몬"
                  {...params}
                  helperText={
                    pokemon !== '미싱노' ? '' : '* 올바른 포켓몬을 선택해주세요'
                  }
                />
              )}
              onChange={(e, v) => {
                if (!v) return
                setPokemon(v.label)
              }}
            />
            <Autocomplete
              id="items"
              options={items}
              sx={{ width: '100%', marginTop: '20px' }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    crossOrigin="anonymous"
                    loading="lazy"
                    width="30"
                    src={apiUrl(`/v1/sprites/items/${option.label}`)}
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  sx={{ '& > p': { color: 'red' } }}
                  label="지닌물건"
                  {...params}
                  helperText={item ? '' : '* 올바른 지닌물건을 선택해주세요'}
                />
              )}
              onChange={(e, v) => {
                if (!v) return
                setItem(v.label)
              }}
            />
          </Grid>
          <Grid item xs={6} mt={4}>
            <Autocomplete
              id="natures"
              options={natures}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  sx={{ '& > p': { color: 'red' } }}
                  label="성격"
                  {...params}
                  helperText={nature ? '' : '* 올바른 성격을 선택해주세요'}
                />
              )}
              onChange={(e, v) => {
                if (!v) return
                setNature(v.name)
              }}
            />
          </Grid>
          <Grid item xs={6} mt={4}>
            <Autocomplete
              id="ability"
              disabled={disabled}
              options={abilities}
              value={{ label: ability }}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  sx={{ '& > p': { color: 'red' } }}
                  label="특성"
                  {...params}
                  helperText={
                    ability || disabled ? '' : '* 올바른 특성을 선택해주세요'
                  }
                />
              )}
              onChange={(e, v) => {
                if (!v) return
                setAbility(v.label)
              }}
            />
          </Grid>
          <Autocomplete
            multiple
            id="moves"
            options={moves}
            value={moveList}
            disabled={disabled}
            sx={{ width: '100%', marginTop: '20px' }}
            getOptionDisabled={() => (moveList.length > 3 ? true : false)}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  crossOrigin="anonymous"
                  loading="lazy"
                  width="25"
                  src={apiUrl(`/v1/sprites/types/${option.type}.svg`)}
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                sx={{ '& > p': { color: 'red' } }}
                label="기술"
                {...params}
                helperText={
                  moves[0].label !== '쪼리핑펀치' || disabled
                    ? ''
                    : '* 올바른 기술을 선택해주세요'
                }
              />
            )}
            renderTags={(value: readonly any[], getTagProps) =>
              value.map((option: any, index: number) => (
                // eslint-disable-next-line react/jsx-key
                <Chip
                  sx={{ marginBottom: '2px', marginLeft: '2px', width: '47%' }}
                  label={option.label}
                  variant="outlined"
                  avatar={
                    <Avatar
                      sx={{ width: 20 }}
                      imgProps={{ crossOrigin: 'anonymous' }}
                      src={apiUrl(`/v1/sprites/types/${option.type}.svg`)}
                    />
                  }
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(e, v) => {
              if (!v) return
              setMove(v)
            }}
          />
          <Autocomplete
            id="teraTypes"
            options={teraTypes}
            sx={{ width: '100%', marginTop: '20px' }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  crossOrigin="anonymous"
                  loading="lazy"
                  width="25"
                  src={apiUrl(`/v1/sprites/types/${option.type}.svg`)}
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                sx={{ '& > p': { color: 'red' } }}
                label="테라스탈 타입"
                {...params}
                helperText={
                  teratype ? '' : '* 올바른 테라스탈 타입을 선택해주세요'
                }
              />
            )}
            onChange={(e, v) => {
              if (!v) return
              setTeraType(v.type)
            }}
          />
          <Grid item xs={2} mt={2} mb={2}>
            항목
          </Grid>
          <Grid item xs={8} sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
            노력치
          </Grid>
          <Grid item xs={2} mt={2} mb={2}>
            개체값
          </Grid>
          <Grid item xs={1}>
            HP
          </Grid>
          <Grid item xs={7} sx={{ paddingLeft: '15px' }}>
            <Slider
              value={typeof Effort[0] === 'number' ? Effort[0] : 0}
              onBlur={handleHp}
              onChange={handleHPSlider}
              step={4}
              marks
              min={0}
              max={252}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: '20px' }}>
            <Input
              size="small"
              onBlur={handleHp}
              onChange={handleHpChange}
              value={Effort[0]}
              inputProps={{
                step: 4,
                min: 0,
                max: 252,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <Input
              sx={{ marginLeft: '10px' }}
              size="small"
              value={Ivs[0]}
              onBlur={IvHpBlur}
              onChange={(e) => {
                setIvs([
                  Number(e.target.value),
                  Ivs[1],
                  Ivs[2],
                  Ivs[3],
                  Ivs[4],
                  Ivs[5],
                ])
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 31,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          {/* 공격 */}
          <Grid
            item
            xs={1}
            sx={{
              color:
                natures.find((v) => v.label == nature)?.correction.atk === 1.1
                  ? 'red'
                  : natures.find((v) => v.label == nature)?.correction.atk ===
                    0.9
                  ? '#33F'
                  : null,
            }}
          >
            공격
          </Grid>
          <Grid item xs={7} sx={{ paddingLeft: '15px' }}>
            <Slider
              value={typeof Effort[1] === 'number' ? Effort[1] : 0}
              onBlur={handleAtk}
              onChange={handleAtkSlider}
              step={4}
              marks
              min={0}
              max={252}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: '20px' }}>
            <Input
              size="small"
              onBlur={handleAtk}
              onChange={handleAtkChange}
              value={Effort[1]}
              inputProps={{
                step: 4,
                min: 0,
                max: 252,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <Input
              sx={{ marginLeft: '10px' }}
              size="small"
              value={Ivs[1]}
              onBlur={IvAtkBlur}
              onChange={(e) => {
                setIvs([
                  Ivs[0],
                  Number(e.target.value),
                  Ivs[2],
                  Ivs[3],
                  Ivs[4],
                  Ivs[5],
                ])
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 31,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          {/* 방어 */}
          <Grid
            item
            xs={1}
            sx={{
              color:
                natures.find((v) => v.label == nature)?.correction.def === 1.1
                  ? 'red'
                  : natures.find((v) => v.label == nature)?.correction.def ===
                    0.9
                  ? '#33F'
                  : null,
            }}
          >
            방어
          </Grid>
          <Grid item xs={7} sx={{ paddingLeft: '15px' }}>
            <Slider
              value={typeof Effort[2] === 'number' ? Effort[2] : 0}
              onBlur={handleDef}
              onChange={handleDefSlider}
              step={4}
              marks
              min={0}
              max={252}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: '20px' }}>
            <Input
              size="small"
              onBlur={handleDef}
              onChange={handleDefChange}
              value={Effort[2]}
              inputProps={{
                step: 4,
                min: 0,
                max: 252,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <Input
              sx={{ marginLeft: '10px' }}
              size="small"
              value={Ivs[2]}
              onBlur={IvDefBlur}
              onChange={(e) => {
                setIvs([
                  Ivs[0],
                  Ivs[1],
                  Number(e.target.value),
                  Ivs[3],
                  Ivs[4],
                  Ivs[5],
                ])
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 31,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          {/* 특공 */}
          <Grid
            item
            xs={1}
            sx={{
              color:
                natures.find((v) => v.label == nature)?.correction.spa === 1.1
                  ? 'red'
                  : natures.find((v) => v.label == nature)?.correction.spa ===
                    0.9
                  ? '#33F'
                  : null,
            }}
          >
            특공
          </Grid>
          <Grid item xs={7} sx={{ paddingLeft: '15px' }}>
            <Slider
              value={typeof Effort[3] === 'number' ? Effort[3] : 0}
              onBlur={handleSpa}
              onChange={handleSpaSlider}
              step={4}
              marks
              min={0}
              max={252}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: '20px' }}>
            <Input
              size="small"
              onBlur={handleSpa}
              onChange={handleSpaChange}
              value={Effort[3]}
              inputProps={{
                step: 4,
                min: 0,
                max: 252,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <Input
              sx={{ marginLeft: '10px' }}
              size="small"
              value={Ivs[3]}
              onBlur={IvSpaBlur}
              onChange={(e) => {
                setIvs([
                  Ivs[0],
                  Ivs[1],
                  Ivs[2],
                  Number(e.target.value),
                  Ivs[4],
                  Ivs[5],
                ])
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 31,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          {/* 특방 */}
          <Grid
            item
            xs={1}
            sx={{
              color:
                natures.find((v) => v.label == nature)?.correction.spd === 1.1
                  ? 'red'
                  : natures.find((v) => v.label == nature)?.correction.spd ===
                    0.9
                  ? '#33F'
                  : null,
            }}
          >
            특방
          </Grid>
          <Grid item xs={7} sx={{ paddingLeft: '15px' }}>
            <Slider
              value={typeof Effort[4] === 'number' ? Effort[4] : 0}
              onBlur={handleSpd}
              onChange={handleSpdSlider}
              step={4}
              marks
              min={0}
              max={252}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: '20px' }}>
            <Input
              size="small"
              onBlur={handleSpd}
              onChange={handleSpdChange}
              value={Effort[4]}
              inputProps={{
                step: 4,
                min: 0,
                max: 252,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <Input
              sx={{ marginLeft: '10px' }}
              size="small"
              value={Ivs[4]}
              onBlur={IvSpdBlur}
              onChange={(e) => {
                setIvs([
                  Ivs[0],
                  Ivs[1],
                  Ivs[2],
                  Ivs[3],
                  Number(e.target.value),
                  Ivs[5],
                ])
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 31,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          {/* 스핏 */}
          <Grid
            item
            xs={1}
            sx={{
              color:
                natures.find((v) => v.label == nature)?.correction.spe === 1.1
                  ? 'red'
                  : natures.find((v) => v.label == nature)?.correction.spe ===
                    0.9
                  ? '#33F'
                  : null,
            }}
          >
            스핏
          </Grid>
          <Grid item xs={7} sx={{ paddingLeft: '15px' }}>
            <Slider
              value={typeof Effort[5] === 'number' ? Effort[5] : 0}
              onBlur={handleSpe}
              onChange={handleSpeSlider}
              step={4}
              marks
              min={0}
              max={252}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: '20px' }}>
            <Input
              size="small"
              onBlur={handleSpe}
              onChange={handleSpeChange}
              value={Effort[5]}
              inputProps={{
                step: 4,
                min: 0,
                max: 252,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <Input
              sx={{ marginLeft: '10px' }}
              size="small"
              value={Ivs[5]}
              onBlur={IvSpeBlur}
              onChange={(e) => {
                setIvs([
                  Ivs[0],
                  Ivs[1],
                  Ivs[2],
                  Ivs[3],
                  Ivs[4],
                  Number(e.target.value),
                ])
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 31,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      hp
                    </TableCell>
                    <TableCell align="right">{realStats[0]}</TableCell>
                    <TableCell component="th" scope="row">
                      공격
                    </TableCell>
                    <TableCell align="right">{realStats[1]}</TableCell>
                    <TableCell component="th" scope="row">
                      방어
                    </TableCell>
                    <TableCell align="right">{realStats[2]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      특공
                    </TableCell>
                    <TableCell align="right">{realStats[3]}</TableCell>
                    <TableCell component="th" scope="row">
                      특방
                    </TableCell>
                    <TableCell align="right">{realStats[4]}</TableCell>
                    <TableCell component="th" scope="row">
                      스핏
                    </TableCell>
                    <TableCell align="right">{realStats[5]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      물리내구
                    </TableCell>
                    <TableCell align="right">
                      {item == '진화의휘석'
                        ? Math.round(
                            (realStats[0] * (realStats[2] * 1.5)) / 0.411
                          )
                        : Math.round((realStats[0] * realStats[2]) / 0.411)}
                    </TableCell>
                    <TableCell component="th" scope="row" />
                    <TableCell scope="row" />
                    <TableCell component="th" scope="row">
                      특수내구
                    </TableCell>
                    <TableCell align="right">
                      {item == '돌격조끼' || item == '진화의휘석'
                        ? Math.round(
                            (realStats[0] * (realStats[4] * 1.5)) / 0.411
                          )
                        : Math.round((realStats[0] * realStats[4]) / 0.411)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <LoadingButton
            sx={{ mt: 2 }}
            variant="contained"
            onClick={Upload}
            loading={waitUpload}
          >
            샘플 올리기
          </LoadingButton>
        </Grid>
      )}
    </Box>
  )
}
