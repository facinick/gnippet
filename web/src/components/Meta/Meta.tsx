import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

export const Loading = ({size}: {size: 'skinny' | 'comfortable'}) => (
  <Box
    sx={{
      height: size === 'skinny' ? 'auto' : '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
)

export const Empty = ({ message, size }: {message: string, size: 'skinny' | 'comfortable'}) => (
  <Box
    sx={{
      height: size === 'skinny' ? 'auto' : '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography>{message}</Typography>
  </Box>
)

export const Failure = ({ message, size }: {message: string, size: 'skinny' | 'comfortable'}) => {

  const theme = useTheme()

  return(
  <Box
    sx={{
      height: size === 'skinny' ? 'auto' : '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.error.main
    }}
  >
    <Typography>{message}</Typography>
  </Box>)
}

interface Error {
  message: string
}

interface Props {
  error?: Error
  loading?: boolean
  empty?: boolean
  message?: string
  children?: JSX.Element
  size?: 'skinny' | 'comfortable'
}

const Meta = ({
  error,
  loading,
  empty,
  size,
  children,
  message,
}: Props) => {

  if(error) {
    return <Failure message={message} size={size || 'comfortable'} />
  }

  if(empty) {
    return <Empty message={message} size={size || 'comfortable'} />
  }

  if(loading) {
    return <Loading size={size || 'comfortable'}/>
  }

  throw new Error('Invalid State in GQL Meta Component!')
}

export default Meta
