import { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
import MUILink from '@mui/material/Link'
import NextLink from 'next/link'

export const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  ...props
}) => {
  return (
    // @ts-expect-error type merged incorrectly
    <MUILink component={NextLink} {...props}>
      {children}
    </MUILink>
  )
}
