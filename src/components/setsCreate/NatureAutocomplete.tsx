import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React from 'react'

interface Props {
  natures: { label: string; name: string }[]
  setNature: React.Dispatch<React.SetStateAction<string>>
}

export const NautreAutocomplete: React.FC<Props> = ({ natures, setNature }) => {
  const [nature, setLocalNature] = React.useState('')
  const onChange = (
    e: React.SyntheticEvent<Element, Event>,
    v: { label: string; name: string } | null,
  ) => {
    if (!v) return
    setNature(v.name)
    setLocalNature(v.name)
  }
  return (
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
      onChange={(e, v) => onChange(e, v)}
    />
  )
}
