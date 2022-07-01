import { LinkProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link, routes } from '@redwoodjs/router'

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
}))

const ForgotPasswordLink = () => {
  return <StyledForgotPasswordLink to={routes.forgotPassword()}>{"FORGOT PASSWORD?"}</StyledForgotPasswordLink>
}

export default ForgotPasswordLink
