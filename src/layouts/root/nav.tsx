import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Logo from '~/assets/images/logo.png'
import { NavLink, navLinks } from './constants'
import { RootDrawer } from './drawer'
import Menu from '@mui/icons-material/Menu'

const NavLinkItem: React.FC<{ item: NavLink }> = ({ item }) => {
  const loc = useLocation()

  const pathname = React.useMemo(
    () => (loc.pathname.endsWith('/') ? loc.pathname : loc.pathname + '/'),
    [loc.pathname]
  )

  const active = React.useMemo(() => item.match.test(pathname), [pathname])

  return (
    <Button
      component={RouterLink}
      to={item.to}
      disableElevation
      variant={active ? 'contained' : 'outlined'}
    >
      {item.label}
    </Button>
  )
}

export const Nav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const closeDrawer = React.useCallback(
    () => setDrawerOpen(false),
    [setDrawerOpen]
  )

  const openDrawer = React.useCallback(
    () => setDrawerOpen(true),
    [setDrawerOpen]
  )

  return (
    <>
      <RootDrawer open={drawerOpen} onClose={closeDrawer} />
      <AppBar color="inherit">
        <Toolbar>
          {/* Logo */}
          <img src={Logo} alt="logo" draggable={false} />

          {/* Space */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Links / Drawer button */}
          {isMobile ? (
            <IconButton onClick={openDrawer}>
              <Menu />
            </IconButton>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              {navLinks.map((x, i) => (
                <NavLinkItem item={x} key={i} />
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
