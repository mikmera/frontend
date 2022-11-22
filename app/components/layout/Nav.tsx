import { AppBar, Container, Toolbar } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Logo from '../../assets/logo.svg'
import { Link } from '~/components/Link'

export const Nav: React.FC = () => {
  return (
    <AppBar
      elevation={0}
      color="inherit"
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', py: '12px' }}
    >
      <Container>
        <Link href="/">
          <Image priority src={Logo} alt="Logo" height={32} />
        </Link>
      </Container>
    </AppBar>
  )
}
