
import { Link, routes } from '@redwoodjs/router'
import { LinkProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import Space from '../Space/Space'

const StyledRememberItSuddenly = styled(Link)<LinkProps>(({ theme }) => ({
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

const RememberItSuddenly = () => {
  return (
    <StyledText>
      {'Remember your password?'}
      <Space />
      <StyledRememberItSuddenly to={routes.login()}>Login!</StyledRememberItSuddenly>
    </StyledText>
  )
}

export default RememberItSuddenly
