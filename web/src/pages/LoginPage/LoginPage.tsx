import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DontHaveAnAccountLink from 'src/components/DontHaveAnAccountLink/DontHaveAnAccountLink'
import LoginForm from 'src/components/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" />
      <div>
        <header>
          <h2>Login</h2>
        </header>
        <LoginForm />
      </div>
      <div>
        <DontHaveAnAccountLink />
      </div>
    </>
  )
}

export default LoginPage
