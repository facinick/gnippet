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
      <div>
        {/* <UserCell username={username}></UserCell> */}
      </div>
    </>
  )
}

export default UserPage
