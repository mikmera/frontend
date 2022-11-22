import { usePathname } from 'next/navigation'
import React from 'react'
import { Link, LinkProps } from '../Link'
import ActiveImage from '~/assets/images/파링이보다 귀여운 파치리스.png'
import Image from 'next/image'

export type NavLinkProps = LinkProps

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  sx,
  ...props
}) => {
  const path = usePathname()

  const active = React.useMemo(() => {
    return path === href
  }, [href, path])

  return (
    <Link
      sx={{
        ...sx,
        fontSize: 20,
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        gap: 1,
      }}
      href={href}
      {...props}
    >
      {active && (
        <Image alt="active" src={ActiveImage} width={36} height={36} />
      )}

      {children}
    </Link>
  )
}
