import { Stack, styled, useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { xDaysAgo } from 'src/utils/stringUtils'
//@ts-ignore
import raw from '../../build_time.txt'

import { Typography, TypographyProps } from '@mui/material'

const CreatedAtText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '14px',
}))


export const LastUpdated = (): JSX.Element => {
  const [date, setDate] = useState(1656065516)
  const theme = useTheme()
  useEffect(() => {
    // console.log(`date fetching..`)
    fetch(raw)
      .then((response) => {
        // console.log(`date fetched...`)
        return response.text()
      })
      .then((text) => {
        // console.log(`date parsed...`)
        // console.log(text)
        // console.log(date)
      })
  }, [])

  return (
    <Stack
      spacing={1}
      direction={'row'}
      alignItems="center"
      justifyContent={'flex-start'}
      sx={{
        padding: '0px 14px',
        borderRadius: '20px',
        background: theme.palette.containerPrimary.main
      }}
    >
      {!date && (
        <CircularProgress
          sx={{ color: theme.palette.text.secondary }}
          size={14}
        />
      )}
      {date && (
        <CreatedAtText>{`Updated 1 year ago`}</CreatedAtText>
      )}
    </Stack>
  )
}
