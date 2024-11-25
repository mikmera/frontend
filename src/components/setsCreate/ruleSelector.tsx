import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { wrapError } from '../ErrorBoundary'

interface RuleSelectorProps {
	type: 'single' | 'double'
	setType: (type: 'single' | 'double') => void
}

export const RuleSelector: React.FC<RuleSelectorProps> = wrapError(({ type, setType }) => {
	return (
		<FormControl>
			<FormLabel id="demo-row-radio-buttons-group-label">샘플 유형</FormLabel>
			<RadioGroup
				row
				value={type}
				onChange={(e) => {
					setType(e.target.value as 'single' | 'double')
				}}
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
			>
				<FormControlLabel value="single" control={<Radio />} label="싱글" />
				<FormControlLabel value="double" control={<Radio />} label="더블" />
			</RadioGroup>
		</FormControl>
	)
})
