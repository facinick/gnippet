
import { xDaysAgo } from 'src/utils/stringUtils'
import { Stack, styled, useTheme } from '@mui/material'

import { Typography, TypographyProps } from '@mui/material'
import Space from '../Space/Space'

const CreatedAtText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
}))

interface Props {
  createdAt: string
}

const UserCreatedAt = ({ createdAt }: Props) => {
  return (
    <>
      <CreatedAtText>
        {"Joined"}
        <Space />
        {xDaysAgo(new Date(createdAt))}
      </CreatedAtText>
    </>
  )
}

export default UserCreatedAt
