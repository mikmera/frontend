import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Logo from '~/assets/images/logo.png'
import LogoLight from '~/assets/images/logo-light.png'
import { NavLink, navLinks } from './constants'
import { RootDrawer } from './drawer'
import Menu from '@mui/icons-material/Menu'
import ActiveImage from '~/assets/images/pachirisu.png'
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
import { useMainContext } from '../../context'
import { FormControlLabel } from '@mui/material'
import { ToggleDarkmode } from '../../components/ToggleDarkmode'
import { useNavigate } from 'react-router-dom'
import { setCookie } from 'react-use-cookie'

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
  const navigate = useNavigate()
  const { theme, update } = useMainContext()
  const [defaultChecked] = React.useState(theme === 'light')

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

  const handleLogoClick = React.useCallback(() => {
    navigate('/')
  }, [navigate])

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
            src={theme === 'dark' ? LogoLight : Logo}
            height={32}
            width={164}
            alt="logo"
            draggable={false}
            onClick={handleLogoClick}
          />

          {/* Space */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mr: 5 }}>
            <FormControlLabel
              control={
                <ToggleDarkmode sx={{ m: 1 }} defaultChecked={defaultChecked} />
              }
              label={
                isMobile ? '' : theme === 'dark' ? '루나톤모드' : '솔록모드'
              }
              onChange={() => {
                update((v) => ({
                  theme: theme === 'dark' ? 'light' : 'dark',
                  user: v.user,
                }))
                setCookie('theme', theme === 'dark' ? 'light' : 'dark')
              }}
            />
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
