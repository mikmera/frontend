import { LinkProps as NextLinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
import { LinkProps as MUILinkProps, Link as MUILink } from '@mui/material'
import NextLink from 'next/link'

export type LinkProps = PropsWithChildren<NextLinkProps & MUILinkProps>

export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <MUILink component={NextLink} {...props}>
      {children}
    </MUILink>
  )
}
