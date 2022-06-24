import {
  Button,
  TextField,
  TextFieldProps,
  OutlinedInputProps,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import { useAuth } from '@redwoodjs/auth'
import { Form, FormError } from '@redwoodjs/forms'
import { styled } from '@mui/material/styles'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import OutlinedInput from '@mui/material/OutlinedInput'

import { useEffect, useRef, useState } from 'react'
import { Login } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ForgotPasswordLink from '../ForgotPasswordLink/ForgotPasswordLink'

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  '& .MuiInputBase-root': {
    color: theme.palette.containerPrimary.contrastText,
    backgroundColor: theme.palette.containerPrimary.main,
  },
  '& .MuiInputBase-root .Mui-error': {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.containerPrimary.main,
  },
}))

const LoginForm = () => {
  const { isAuthenticated, logIn, loading } = useAuth()

  const [submitting, setSubmitting] = useState(false)

  const formRef = useRef<HTMLFormElement>()
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  // ------------------------------------------------------------------

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home({ page: 0 }))
    }
  }, [isAuthenticated])

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const areInputsValid = async () => {
    if (!username) {
      setUsernameError(true)
      setUsernameErrorMessage('Username cannot be empty!')
    }

    if (!password) {
      setPasswordError(true)
      setPasswordErrorMessage('Password cannot be empty!')
    }

    if (!username || !password) {
      return false
    }

    return true
  }

  const onSubmit = async () => {
    const isValid = await areInputsValid()
    if (!isValid) {
      return
    }

    setSubmitting(true)

    try {
      const response = await logIn({ username, password })
      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
        setUsernameError(true)
        setPasswordError(true)
      } else {
        toast.success('Welcome back!')
        formRef.current.reset()
      }
    } catch (error) {
      toast.error(error.message)
    }

    setSubmitting(false)
  }

  const handleClickPasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onUsernameInput = (event) => {
    const value = event.target.value
    setUsername(value)
    setUsernameError(false)
    setUsernameErrorMessage('')
  }

  const onPasswordInput = (event) => {
    const value = event.target.value
    setPassword(value)
    setPasswordError(false)
    setPasswordErrorMessage('')
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
      {/* <FormError error={error} /> */}
      <Stack direction="column" spacing={1}>
        <StyledTextField
          name="username"
          required
          disabled={loading}
          error={usernameError}
          helperText={usernameError ? usernameErrorMessage : ''}
          onInput={onUsernameInput}
          size="small"
          inputRef={usernameRef}
          label={'Username'}
        />

        <StyledTextField
          name="password"
          required
          type={passwordVisible ? 'text' : 'password'}
          disabled={loading}
          error={passwordError}
          helperText={passwordError ? passwordErrorMessage : ''}
          onInput={onPasswordInput}
          size="small"
          inputRef={passwordRef}
          label={'Password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickPasswordVisible}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  title={passwordVisible ? 'hide' : 'show'}
                >
                  {passwordVisible ? (
                    <VisibilityOff sx={{fontSize: 24}} />
                  ) : (
                    <Visibility sx={{fontSize: 24}} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <ForgotPasswordLink /> */}
        <Button
          aria-label="Login"
          title={'Login'}
          endIcon={<Login />}
          size={'small'}
          variant="contained"
          onSubmit={onSubmit}
          disabled={loading}
          type="submit"
        >
          {'Login'}
        </Button>
      </Stack>
    </Form>
  )
}

export default LoginForm
