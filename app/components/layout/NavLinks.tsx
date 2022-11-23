import { Box, Grid, List, ListItem } from '@mui/material'
import React from 'react'
import { DarkModeSwitch } from '../DarkModeSwitch'
import { NavLink } from './NavLink'

const links = [
  {
    label: '메인',
    href: '/',
  },
  {
    label: '샘플',
    href: '/sample',
  },
  {
    label: '파티',
    href: '/party',
  },
  {
    label: '계산기',
    href: '/calc',
  },
]

export const NavLinksMobile: React.FC = () => {
  return (
    <List>
      {links.map((x, i) => (
        <ListItem key={i}>
          <NavLink href={x.href}>{x.label}</NavLink>
        </ListItem>
      ))}
      <ListItem sx={{ justifyContent: 'center' }}>
        <DarkModeSwitch />
      </ListItem>
    </List>
  )
}

export const NavLinks: React.FC = () => {
  return (
    <>
      {/* <NavLink href="/">메인</NavLink>
      {/* <NavLink href="/sample">샘플</NavLink>
          <NavLink href="/party">파티</NavLink>
          <NavLink href="/calc">계산기</NavLink>
          <NavLink href="/login">로그인</NavLink> */}

      {links.map((x, i) => (
        <NavLink href={x.href} key={i}>
          {x.label}
        </NavLink>
      ))}

      <Box sx={{ ml: 2 }} />
      <DarkModeSwitch />
    </>
  )
}
