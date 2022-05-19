import { Link, routes } from "@redwoodjs/router"

interface Props {
  username: string
}

const Username = ({ username }: Props) => {
  return (
    <Link to={routes.user({ username })}>@{username}</Link>
  )
}

export default Username
