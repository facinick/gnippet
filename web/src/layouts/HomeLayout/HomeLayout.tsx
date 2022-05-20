import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import Search from 'src/components/Search/Search'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import Stack from '@mui/material/Stack'
import LogoutButton from 'src/components/LogoutButton/LogoutButton'
import LoginButton from 'src/components/LoginButton/LoginButton'
import HomeButton from 'src/components/HomeButton/HomeButton'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster />
      <Stack spacing={5}>
      <header>
        <Stack spacing={1} direction="row" alignItems={"center"}>


          <div>
            <HomeButton />
          </div>

          <div style={{width: "100%"}}>
            <Search />
          </div>

          <div>
            <ThemeSwitch />
          </div>

          {isAuthenticated && (
            <div>
              <LogoutButton />
            </div>)
          }

          {!isAuthenticated && (
            <div>
              <LoginButton />
            </div>)
          }
        </Stack>
      </header>
      <main>{children}</main>
      </Stack>
    </>
  )
}

export default HomeLayout
