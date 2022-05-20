import { Router } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'

const LoginButton = () => {

  const onCLick = () => {
    navigate(routes.login())
  }

  return (
    <IconButton title={"Login"} onClick={onCLick} aria-label="login">
      <LoginIcon />
    </IconButton>
  )
}

export default LoginButton
