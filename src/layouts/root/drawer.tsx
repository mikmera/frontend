import { Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavLink, navLinks } from './constants'

export type RootDrawerProps = {
  open: boolean
  onClose: () => void
}

const NavLinkItem: React.FC<{ item: NavLink; onClick: () => void }> = ({
  item,
  onClick,
}) => {
  const loc = useLocation()

  const pathname = React.useMemo(
    () => (loc.pathname.endsWith('/') ? loc.pathname : loc.pathname + '/'),
    [loc.pathname]
  )

  const active = React.useMemo(() => item.match.test(pathname), [pathname])

  return (
    <ListItemButton
      onClick={onClick}
      selected={active}
      component={Link}
      to={item.to}
    >
      <ListItemText primary={item.label} />
    </ListItemButton>
  )
}

export const RootDrawer: React.FC<RootDrawerProps> = ({ onClose, open }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List sx={{ minWidth: 256 }}>
        {/* Nav Links */}

        {navLinks.map((x, i) => (
          <NavLinkItem onClick={onClose} item={x} key={i} />
        ))}
      </List>
    </Drawer>
  )
}
