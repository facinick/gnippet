import { Router } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'

const HomeButton = () => {

  const onCLick = () => {
    navigate(routes.home({page: 0}))
  }

  return (
    <IconButton title={"Home"} onClick={onCLick} aria-label="home">
      <HomeIcon />
    </IconButton>
  )
}

export default HomeButton
