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
    label: '메인',
    href: '/',
  },
  {
    label: '메인',
    href: '/',
  },
  {
    label: '메인',
    href: '/',
  },
  {
    label: '메인',
    href: '/',
  },
]

export const NavLinksMobile: React.FC = () => {
  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      {links.map((x, i) => (
        <Grid key={i} xs={6} md={4} item>
          <NavLink href={x.href}>{x.label}</NavLink>
        </Grid>
      ))}
      <Grid
        item
        xs={6}
        md={4}
        sx={{ justifyContent: 'center', display: 'flex' }}
      >
        <DarkModeSwitch />
      </Grid>
    </Grid>
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
