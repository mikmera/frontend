import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  styled,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Logo from '~/assets/images/logo.png'
import { NavLink, navLinks } from './constants'
import { RootDrawer } from './drawer'
import Menu from '@mui/icons-material/Menu'
import ActiveImage from '~/assets/images/파링이보다 귀여운 파치리스.png'
import { AnimateSharedLayout, LayoutGroup, motion } from 'framer-motion'

const StyledRouterLink = styled(RouterLink)(() => ({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
  fontSize: '18px',
  position: 'relative',
}))

const NavLinkItem: React.FC<{ item: NavLink }> = ({ item }) => {
  const loc = useLocation()

  const pathname = React.useMemo(
    () => (loc.pathname.endsWith('/') ? loc.pathname : loc.pathname + '/'),
    [loc.pathname]
  )

  const active = React.useMemo(() => item.match.test(pathname), [pathname])

  return (
    <StyledRouterLink to={item.to}>
      {active && (
        <motion.img
          src={ActiveImage}
          height={32}
          alt="active"
          layoutId="nav-link-active"
          style={{
            position: 'absolute',
            left: -40,
          }}
        />
      )}

      {item.label}
    </StyledRouterLink>
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

  const toggleDrawer = React.useCallback(
    () => setDrawerOpen((v) => !v),
    [setDrawerOpen]
  )

  return (
    <>
      <RootDrawer open={drawerOpen && isMobile} onClose={closeDrawer} />
      <AppBar
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* Logo */}
          <img src={Logo} alt="logo" draggable={false} />

          {/* Space */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Links / Drawer button */}
          {isMobile ? (
            <IconButton onClick={toggleDrawer}>
              <Menu />
            </IconButton>
          ) : (
            <LayoutGroup>
              <Stack
                direction="row"
                alignItems="center"
                spacing={6}
                height="100%"
              >
                {navLinks.map((x, i) => (
                  <NavLinkItem item={x} key={i} />
                ))}
              </Stack>
            </LayoutGroup>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
