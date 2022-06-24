import { Link, routes } from '@redwoodjs/router'

import { LinkProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const UsernameLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '5px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const UsernameDefault = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}))

interface Props {
  username: string
  style?: 'link' | 'default'
}

const Username = ({ username, style }: Props) => {
  if (style === 'default') {
    return <UsernameDefault>{username}</UsernameDefault>
  }
  return <UsernameLink to={routes.user({ username })}>@{username}</UsernameLink>
}

export default Username
