import { Link, routes } from '@redwoodjs/router'
import { LinkProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import Space from '../Space/Space'

const StyledSignupLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '5px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const StyledText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '16px',
  marginTop: '20px',
}))

const AlreadyHaveAnAccountLink = () => {
  return (
    <StyledText>
      {"Already have an account?"}
      <Space />
      <StyledSignupLink to={routes.login()}>Login!</StyledSignupLink>
    </StyledText>
  )
}

export default AlreadyHaveAnAccountLink
