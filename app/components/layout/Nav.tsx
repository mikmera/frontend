'use client'

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import Image from 'next/image'
import React from 'react'
import Logo from '../../assets/logo.svg'
import { Link } from '~/components/Link'
import { Sidebar } from './Sidebar'
import { useMediaQuery } from '~/utils/useMediaQuery'
import { NavLinks } from './NavLinks'

export const Nav: React.FC = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))

  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const closeSidebar = React.useCallback(
    () => setSidebarOpen(false),
    [setSidebarOpen]
  )
  const openSidebar = React.useCallback(
    () => setSidebarOpen(true),
    [setSidebarOpen]
  )

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
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
            {mobile ? (
              <IconButton onClick={openSidebar}>
                <Menu />
              </IconButton>
            ) : (
              <Stack direction="row" alignItems="center" height="100%">
                <NavLinks />
              </Stack>
            )}
          </Stack>
        </Container>
      </AppBar>
    </>
  )
}
