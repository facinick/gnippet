import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

interface Props {
  username: string
}

const UserPage = ({ username }: Props) => {
  return (
    <>
      <MetaTags title="User" description="User page" />

      <h1>UserPage</h1>
      <p>
        Hi <code>{username}</code>
      </p>
    </>
  )
}

export default UserPage
