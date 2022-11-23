import { Drawer } from '@mui/material'
import React from 'react'
import { NavLinksMobile } from './NavLinks'

export type SidebarProps = {
  open: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer onClick={onClose} open={open} onClose={onClose} anchor="right">
      <NavLinksMobile />
    </Drawer>
  )
}
