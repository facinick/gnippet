import { Router } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { navigate, routes } from '@redwoodjs/router'
import { useReactiveVar } from '@apollo/client'
import {
  sortByVar,
} from 'src/localStore/homeFeedSortBy'
const HomeButton = () => {

  const selectedSortByOption = useReactiveVar(sortByVar)
  const onCLick = () => {
    navigate(`/${selectedSortByOption}/${0}`)
  }

  return (
    <IconButton color={'secondary'} title={"Home"} onClick={onCLick} aria-label="home">
      <HomeIcon />
    </IconButton>
  )
}

export default HomeButton
