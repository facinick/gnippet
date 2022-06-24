import { useEffect, useState } from 'react'
//@ts-ignore
import raw from 'src/build_time.txt'
import CircularProgress from '@mui/material/CircularProgress'
import { xDaysAgo } from 'src/utils/stringUtils'

export const LastUpdated = (): JSX.Element => {
  const [date, setDate] = useState('')

  useEffect(() => {
    fetch(raw)
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        setDate(text)
      })

  }, [])

  return (
    <h4>
      {!date && <CircularProgress size={30} />}
      {date && `Data updated ${xDaysAgo(new Date(Number(date) * 1000))}`}
    </h4>
  )
}
