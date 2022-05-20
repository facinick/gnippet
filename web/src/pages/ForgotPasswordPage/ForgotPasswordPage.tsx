import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ForgotPasswordForm from 'src/components/ForgotPasswordForm/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaTags title="Forgot Password" />
      <div>
        <header>
          <h2>Forgot Password</h2>
        </header>
        <ForgotPasswordForm />
      </div>
      <div>
        <span>Remember it suddenly?</span>{' '}
        <Link to={routes.login()}>Login!</Link>
      </div>
    </>
  )
}

export default ForgotPasswordPage
