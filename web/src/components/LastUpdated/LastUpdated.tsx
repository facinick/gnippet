import { useEffect, useState } from 'react'
import raw from '../../build_time.txt'
import CircularProgress from '@mui/material/CircularProgress'
import { xDaysAgo } from 'src/utils/stringUtils'
import { Stack, styled, useTheme } from '@mui/material'

import { Typography, TypographyProps } from '@mui/material'

const CreatedAtText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
}))


export const LastUpdated = (): JSX.Element => {
  const [date, setDate] = useState(1656065516)
  const theme = useTheme()
  useEffect(() => {
    console.log(`date fetching..`)
    fetch(raw)
      .then((response) => {
        console.log(`date fetched...`)
        return response.text()
      })
      .then((text) => {
        console.log(`date parsed...`)
        console.log(text)
        console.log(date)
      })
  }, [])

  return (
    <Stack
      spacing={1}
      direction={'row'}
      alignItems="center"
      justifyContent={'flex-start'}
    >
      {!date && (
        <CircularProgress
          sx={{ color: theme.palette.text.secondary }}
          size={14}
        />
      )}
      {date && (
        <CreatedAtText>{`Updated ${xDaysAgo(
          new Date(Number(date) * 1000)
        )}`}</CreatedAtText>
      )}
    </Stack>
  )
}
