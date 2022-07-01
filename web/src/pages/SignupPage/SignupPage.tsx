import { MetaTags } from '@redwoodjs/web'
import AlreadyHaveAnAccountLink from 'src/components/AlreadyHaveAnAccountLink/AlreadyHaveAnAccountLink'
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
        <AlreadyHaveAnAccountLink />
      </div>
    </>
  )
}

export default SignupPage
