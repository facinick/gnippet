import { Router } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'

const LoginButton = () => {

  const onCLick = () => {
    navigate(routes.login())
  }

  return (
    <IconButton title={"Login"} onClick={onCLick} aria-label="login">
      <LoginIcon color={'secondary'} />
    </IconButton>
  )
}

export default LoginButton
