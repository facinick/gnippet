import { Router } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'
import { back } from '@redwoodjs/router'

const BackButton = () => {

  const onCLick = () => {
    back()
  }

  return (
    <IconButton title={"Login"} onClick={onCLick} aria-label="login">
      <ArrowBackIcon />
    </IconButton>
  )
}

export default BackButton
