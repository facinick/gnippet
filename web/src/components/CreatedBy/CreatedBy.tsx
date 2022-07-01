import CopyrightIcon from '@mui/icons-material/Copyright'
import {
  Stack, styled, Typography,
  TypographyProps, useTheme
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
        sx={{
          padding: '0px 14px',
          borderRadius: '20px',
          background: theme.palette.containerPrimary.main,
        }}
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
