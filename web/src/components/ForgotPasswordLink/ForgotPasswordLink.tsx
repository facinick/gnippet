import { Link, routes } from '@redwoodjs/router'

import { LinkProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledForgotPasswordLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '5px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  fontSize: '16px',
  // margin: `5px 0px`,
}))

const ForgotPasswordLink = () => {
  return <StyledForgotPasswordLink to={routes.forgotPassword()}>{"Forgot Password?"}</StyledForgotPasswordLink>
}

export default ForgotPasswordLink
