import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  return (
    <>
      <Toaster />
      <header>
        <nav>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
          </ul>
        </nav>
        <ThemeSwitch />
      </header>
      <main>{children}</main>
    </>
  )
}

export default HomeLayout
