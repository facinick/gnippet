import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <header>
        <h1>Home Layout</h1>
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
          <ul>
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
      </header>
      <main>{children}</main>
    </>
  )
}

export default HomeLayout
