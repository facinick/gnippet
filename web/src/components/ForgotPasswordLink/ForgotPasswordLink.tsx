import { Link, routes } from '@redwoodjs/router'

import { LinkProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledForgotPasswordLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '5px',
  fontWeight: 800,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  fontSize: '14px',
  // margin: `5px 0px`,
}))

const ForgotPasswordLink = () => {
  return <StyledForgotPasswordLink to={routes.forgotPassword()}>{"FORGOT PASSWORD?"}</StyledForgotPasswordLink>
}

export default ForgotPasswordLink
