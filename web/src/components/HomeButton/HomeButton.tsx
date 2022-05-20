import { Router } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'

const HomeButton = () => {

  const onCLick = () => {
    navigate(routes.home())
  }

  return (
    <IconButton title={"Login"} onClick={onCLick} aria-label="login">
      <HomeIcon />
    </IconButton>
  )
}

export default HomeButton
