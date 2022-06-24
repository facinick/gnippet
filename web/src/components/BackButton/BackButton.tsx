import { Router } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'
import { back } from '@redwoodjs/router'

const BackButton = () => {

  const onCLick = (event) => {
    event.preventDefault()
    back()
  }

  return (
    <IconButton
      title={'Back'}
      onClick={onCLick}
      aria-label="back"
    >
      <ArrowBackIcon color={'secondary'} />
    </IconButton>
  )
}

export default BackButton
