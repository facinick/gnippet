// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import HomeLayout from 'src/layouts/HomeLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import { Router, Route, Set } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'
import { USER_DATA_QUERY } from './pages/Queries/queries'
import { useLazyQuery } from '@apollo/client'

const Routes = () => {
  const { currentUser, isAuthenticated } = useAuth()

  // const [getLoggedInUserData] = useLazyQuery(USER_DATA_QUERY)

  // useEffect(() => {
  //   if (currentUser?.id && isAuthenticated) {
  //     getLoggedInUserData({
  //       fetchPolicy: 'network-only',
  //       variables: {
  //         id: currentUser?.id,
  //       },
  //     })
  //   } else {
  //     // reset cache
  //   }
  // }, [isAuthenticated])

  return (
    <Router>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>

      <Set wrap={HomeLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/new/{page:Int}" page={HomePage} name="home" />
        <Route path="/s/{id:Int}" page={SnippetPage} name="snippet" />
        <Route path="/u/{username:String}" page={UserPage} name="user" />
        <Route path="/t/{name:String}" page={TagPage} name="tag" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
