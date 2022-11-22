import { Box, ButtonBase } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import Dark from '~/assets/images/dark.png'
import Light from '~/assets/images/light.png'
import Image from 'next/image'

const darkBg = 'linear-gradient(183.67deg, #2B4485 6.6%, #AFCAFF 96.98%)'
const lightBg = 'linear-gradient(180deg, #66FFED 0%, #FFEEB2 100%)'

const AnimatedButtonBase = motion(ButtonBase)
const AnimatedBox = motion(Box)
const AnimatedImage = motion(Image)

export const DarkModeSwitch: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false) // temp

  const bg = React.useMemo(() => (isDark ? darkBg : lightBg), [isDark])

  const toggle = React.useCallback(() => {
    setIsDark((dark) => !dark)
  }, [setIsDark])

  return (
    <AnimatedButtonBase
      sx={{
        boxShadow: '0px 6px 8px 3px #00000040 inset',
        height: 36,
        width: 72,
        borderRadius: 18,
        position: 'relative',
      }}
      animate={{
        background: bg,
      }}
      onClick={toggle}
    >
      <AnimatedBox
        animate={
          isDark
            ? { left: 4 }
            : {
                right: 4,
              }
        }
        sx={{
          width: 28,
          height: 28,
          background: '#d9d9d9',
          borderRadius: 16,
          position: 'absolute',
          top: 4,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            '& > *': {
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <motion.div animate={{ opacity: isDark ? 1 : 0 }}>
            <AnimatedImage src={Dark} alt="dark mode" height={18} />
          </motion.div>
          <motion.div animate={{ opacity: isDark ? 0 : 1 }}>
            <AnimatedImage src={Light} alt="light mode" height={18} />
          </motion.div>
        </Box>
      </AnimatedBox>
    </AnimatedButtonBase>
  )
}
