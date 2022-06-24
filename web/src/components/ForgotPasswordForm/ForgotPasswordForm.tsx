import Stack from '@mui/material/Stack'
import { useAuth } from '@redwoodjs/auth'
import { Form } from '@redwoodjs/forms'
import {
  Button,
  TextField,
  TextFieldProps,
  OutlinedInputProps,
  styled,
  InputAdornment,
} from '@mui/material'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useRef, useState } from 'react'
import LockResetIcon from '@mui/icons-material/LockReset'
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
  const { isAuthenticated, forgotPassword } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home({ page: 0 }))
    }
  }, [isAuthenticated])

  const formRef = useRef<HTMLFormElement>()
  const usernameRef = useRef<HTMLInputElement>()

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const areInputsValid = async () => {
    if (!username) {
      setUsernameError(true)
      setUsernameErrorMessage('Username cannot be empty!')
    }

    if (!username) {
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
      const response = await forgotPassword(username)
      toast(response.message)
    } catch (error) {
      setUsernameError(true)
      setUsernameErrorMessage(error.message)
      toast.error(error.message)
    }

    setSubmitting(false)
  }

  const onUsernameInput = (event) => {
    const value = event.target.value
    setUsername(value)
    setUsernameError(false)
    setUsernameErrorMessage('')
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
      {/* <FormError error={error} /> */}
      <Stack direction="column" spacing={1}>
        <StyledTextField
          name="username"
          required
          // disabled={loading}
          error={usernameError}
          helperText={usernameError ? usernameErrorMessage : ''}
          onInput={onUsernameInput}
          size="small"
          inputRef={usernameRef}
          label={'Username'}
        />

        <Button
          aria-label="Reset"
          title={'Reset'}
          endIcon={<LockResetIcon />}
          size={'small'}
          variant="contained"
          onSubmit={onSubmit}
          // disabled={loading}
          type="submit"
        >
          {'Email me reset link'}
        </Button>
      </Stack>
    </Form>
  )
}

export default LoginForm
