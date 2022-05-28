import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '@redwoodjs/auth';

const LogoutButton = () => {

  const { logOut } = useAuth()

  return (
    <IconButton color={'secondary'} title={"Logout"} onClick={logOut} aria-label="logout">
      <LogoutIcon />
    </IconButton>
  )
}

export default LogoutButton
