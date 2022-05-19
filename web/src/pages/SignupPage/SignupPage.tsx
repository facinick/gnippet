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
    </>
  )
}

export default SignupPage
