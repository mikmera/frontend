'use client'

import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Logo from '../../assets/logo.svg'
import { Link } from '~/components/Link'
import { NavLink } from './NavLink'

export const Nav: React.FC = () => {
  return (
    <AppBar
      elevation={0}
      color="inherit"
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', height: 64 }}
    >
      <Container sx={{ height: '100%' }}>
        <Stack direction="row" gap={4} alignItems="center" height="100%">
          <Link href="/">
            <Image priority src={Logo} alt="Logo" height={32} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" alignItems="center" height="100%">
            <NavLink href="/">메인</NavLink>
            <NavLink href="/sample">샘플</NavLink>
            <NavLink href="/party">파티</NavLink>
            <NavLink href="/calc">계산기</NavLink>
            <NavLink href="/login">로그인</NavLink>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  )
}
