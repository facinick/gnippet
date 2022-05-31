import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UserCell from 'src/components/UserCell/UserCell'

interface Props {
  username: string
  tab: string
}

const UserPage = ({ username, tab }: Props) => {


  return (
    <>
      <MetaTags title="User" description="User page" />

      <Container maxWidth="md">
        <UserCell tab={tab} username={username}></UserCell>
      </Container>
    </>
  )
}

export default UserPage
