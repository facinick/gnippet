import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import Search from 'src/components/Search/Search'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster />
      <header>
        <Search />
        {isAuthenticated && (
            <div>
              <span>Logged in as {currentUser?.username}</span>{' '}
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          )
        }

        <nav>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            {!isAuthenticated &&
              <>
                <li>
                  <Link to={routes.login()}>Login</Link>
                </li>
                <li>
                  <Link to={routes.signup()}>Signup</Link>
                </li>
              </>
            }
          </ul>
        </nav>

        <ThemeSwitch />
      </header>
      <main>{children}</main>
    </>
  )
}

export default HomeLayout
