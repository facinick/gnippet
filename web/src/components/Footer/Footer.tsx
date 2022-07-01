import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import CreatedBy from '../CreatedBy/CreatedBy'
import { LastUpdated } from '../LastUpdated/LastUpdated'

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
