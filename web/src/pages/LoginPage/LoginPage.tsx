import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
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
        <span>Don&apos;t have an account?</span>{' '}
        <Link to={routes.signup()}>Sign up!</Link>
      </div>
    </>
  )
}

export default LoginPage
