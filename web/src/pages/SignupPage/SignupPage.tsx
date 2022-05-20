import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SignupForm from 'src/components/SignupForm/SignupForm'

const SignupPage = () => {
  return (
    <>
      <MetaTags title="Signup" />
      <div>
        <header>
          <h2>Signup</h2>
        </header>
        <SignupForm />
      </div>
      <div>
        <span>Already have an account?</span>{' '}
        <Link to={routes.login()}>Login!</Link>
      </div>
    </>
  )
}

export default SignupPage
