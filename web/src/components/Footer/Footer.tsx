import { LastUpdated } from '../LastUpdated/LastUpdated'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import CreatedBy from '../CreatedBy/CreatedBy'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material'

const Footer = () => {
  return (
    <Container maxWidth="md">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <LastUpdated />
        <CreatedBy />
      </Stack>
    </Container>
  )
}

export default Footer
