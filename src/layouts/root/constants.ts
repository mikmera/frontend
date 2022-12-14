export type NavLink = {
  to: string
  match: RegExp
  label: string
}

export const navLinks: NavLink[] = [
  {
    to: '/',
    match: /^\/(dex\/(single|double|vgc|seriesSingle|seriesDouble)\/(\d+)\/)?$/,
    label: '메인',
  },
  {
    to: '/sample',
    match: /^\/sample\//,
    label: '샘플',
  },
  {
    to: '/party',
    match: /^\/party\//,
    label: '파티',
  },
  {
    to: '/calc',
    match: /^\/calc\//,
    label: '계산기',
  },
]
