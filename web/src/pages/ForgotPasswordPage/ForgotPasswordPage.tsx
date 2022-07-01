import { MetaTags } from '@redwoodjs/web'
import ForgotPasswordForm from 'src/components/ForgotPasswordForm/ForgotPasswordForm'
import RememberItSuddenly from 'src/components/RememberItSuddenly/RememberItSuddenly'

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
        <RememberItSuddenly />
      </div>
    </>
  )
}

export default ForgotPasswordPage
