import Stack from '@mui/material/Stack'
import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  TextField,
  Label,
  Submit,
  SubmitHandler,
  FieldError,
  PasswordField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useRef } from 'react'

interface FormValues {
  username: string
}

const LoginForm = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home({page: 0}))
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success('A link to reset your password was sent to ' + response.email)
      navigate(routes.login())
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <Stack direction="column" spacing={1}>
          <Label name="username" errorClassName="error">
            Username
          </Label>
          <TextField
            name="username"
            errorClassName="error"
            ref={usernameRef}
            validation={{
              required: {
                value: true,
                message: 'Username is required',
              },
            }}
          />

          <FieldError name="username" />
          <Submit>Submit</Submit>
        </Stack>
      </Form>
    </>
  )
}

export default LoginForm
