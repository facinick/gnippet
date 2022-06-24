import { Link, routes } from '@redwoodjs/router'

import { LinkProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { capitalizeFirstLetter } from 'src/utils/stringUtils'

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
  return (
    <UsernameLink
      title={`Goto ${capitalizeFirstLetter(username)}'s Profile`}
      to={routes.user({ username })}
    >
      @{username}
    </UsernameLink>
  )
}

export default Username
