import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

export const Loading = () => (
  <Box
    sx={{
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
)

export const Empty = ({ message }: {message: string}) => (
  <Box
    sx={{
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography>{message}</Typography>
  </Box>
)

export const Failure = ({ message }: {message: string}) => {

  const theme = useTheme()

  return(
  <Box
    sx={{
      height: '200px',
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
}

const Meta = ({
  error,
  loading,
  empty,
  children,
  message,
}: Props) => {

  if(error) {
    return <Failure message={message} />
  }

  if(empty) {
    return <Empty message={message} />
  }

  if(loading) {
    return <Loading/>
  }

  throw new Error('Invalid State in GQL Meta Component!')
}

export default Meta
