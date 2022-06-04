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

const Routes = () => {
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
        <Route path="/new/{page:Int}" page={HomePage} name="homeSortPage" />
        <Route path="/activity/{page:Int}" page={HomePage} name="homeSortPage" />
        <Route path="/score/{page:Int}" page={HomePage} name="homeSortPage" />
        <Route path="/s/{id:Int}" page={SnippetPage} name="snippet" />
        <Route path="/u/{username:String}" page={UserPage} name="user" />
        <Route path="/u/{username:String}/{tab:String}" page={UserPage} name="userTab" />
        <Route path="/t/{name:String}" page={TagPage} name="tag" />
      </Set>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
