import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Logo from '~/assets/images/logo.png'
import { NavLink, navLinks } from './constants'
import { RootDrawer } from './drawer'
import Menu from '@mui/icons-material/Menu'
import ActiveImage from '~/assets/images/파링이보다 귀여운 파치리스.png'
import { LayoutGroup, motion } from 'framer-motion'
import { wrapError } from '~/components/ErrorBoundary'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import styled from '@mui/material/styles/styled'
import { useThemeContext } from '../../context'
import { Avatar } from '@mui/material'
import darkmode from '../../assets/images/dark.png'
import lightmode from '../../assets/images/light.png'

const StyledRouterLink = styled(RouterLink)(() => ({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
  fontSize: '18px',
  position: 'relative',
}))

const NavLinkItem: React.FC<{ item: NavLink }> = wrapError(({ item }) => {
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
          width={32}
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
})

export const Nav: React.FC = wrapError(() => {
  const { theme, update } = useThemeContext()

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const themePalette = useTheme()

  const isMobile = useMediaQuery(themePalette.breakpoints.down('md'))

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
          <img
            src={Logo}
            height={32}
            width={164}
            alt="logo"
            draggable={false}
            // goto main page when clicked
            onClick={closeDrawer}
          />

          {/* Space */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mr: 5 }}>
            {theme === 'dark' ? (
              <Avatar
                alt="라이트모드"
                src={lightmode}
                onClick={() => {
                  update(() => 'light')
                }}
              />
            ) : (
              <Avatar
                alt="다크모드"
                src={darkmode}
                onClick={() => {
                  update(() => 'dark')
                }}
              />
            )}
          </Box>

          {/* Links / Drawer button */}
          {isMobile ? (
            <IconButton aria-label="Menu" onClick={toggleDrawer}>
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
})
