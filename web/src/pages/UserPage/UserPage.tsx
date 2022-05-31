import Avatar from '@mui/material/Avatar'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UserCell from 'src/components/UserCell/UserCell'

interface Props {
  username: string
}

const UserPage = ({ username }: Props) => {


  return (
    <>
      <MetaTags title="User" description="User page" />
      <h1>@{username}</h1>
      <UserCell username={username}></UserCell>
    </>
  )
}

export default UserPage
