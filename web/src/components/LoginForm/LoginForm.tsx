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

const UserDataQuery = gql`
  query currentuserdata($input: Int!) {
    user(id: $input) {
      id,
      username
      avatarUrl
      isBanned
      roles
      createdAt
      bio
      votes {
        snippetId
        commentId
        type
        id
      }
      snippets {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        }
      }
      comments {
        id
        body
        createdAt
        activity
        score
        author {
          username
        }
      }
      pages {
        id
        name
        createdAt
        population
      }
    }
  }
`
interface FormValues {
  username: string
  password: string
}

const LoginForm = () => {
  const { isAuthenticated, logIn, loading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        {/* <FormError error={error} /> */}
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

          <Label name="password" errorClassName="error">
            Password
          </Label>
          <PasswordField
            name="password"
            errorClassName="error"
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />

          <FieldError name="password" />

          <div>
            <Link to={routes.forgotPassword()}>Forgot Password?</Link>
          </div>

          <Submit disabled={loading}>Login</Submit>
        </Stack>
      </Form>
    </>
  )
}

export default LoginForm
