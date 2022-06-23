import { Link, routes } from "@redwoodjs/router"

import { LinkProps } from '@mui/material'
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

interface Props {
  username: string
}

const Username = ({ username }: Props) => {
  return (
    <UsernameLink to={routes.user({ username })}>@{username}</UsernameLink>
  )
}

export default Username
