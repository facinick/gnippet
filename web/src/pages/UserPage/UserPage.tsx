import Avatar from '@mui/material/Avatar'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

interface Props {
  username: string
}

const UserPage = ({ username }: Props) => {


  return (
    <>
      <MetaTags title="User" description="User page" />

      <h1>@{username}</h1>
      <Avatar alt={`${username} picture`} src={`https://avatars.dicebear.com/api/bottts/${username}.svg`} />
      <div>
        {/* <UserCell username={username}></UserCell> */}
      </div>
    </>
  )
}

export default UserPage
