import { Stack, styled, useTheme } from '@mui/material'
import CopyrightIcon from '@mui/icons-material/Copyright'
import {
  Typography,
  TypographyProps,
} from '@mui/material'
import Space from '../Space/Space'

const CreatedAtText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
}))

const CreatedBy = () => {
  const theme = useTheme()
  return (
    <>
      <Stack
        direction={'row'}
        alignItems="center"
        justifyContent={'flex-end'}
      >
        <CreatedAtText>{'facinick'}</CreatedAtText>
        <Space />
        <CopyrightIcon
          sx={{ fontSize: 14, color: theme.palette.text.secondary }}
        />
        <Space />
        <CreatedAtText>{'2022'}</CreatedAtText>
      </Stack>
    </>
  )
}

export default CreatedBy
