import { useEffect, useState } from 'react'
//@ts-ignore
import raw from '../../build_time.txt'
import CircularProgress from '@mui/material/CircularProgress'
import { xDaysAgo } from 'src/utils/stringUtils'

export const LastUpdated = (): JSX.Element => {
  const [date, setDate] = useState('')

  useEffect(() => {
    console.log(`fetching...`)
    fetch(raw)
      .then((response) => {
         console.log(`fetched...`)
        return response.text()
      })
      .then((text) => {
         console.log(`text is...`)
         console.log(text)
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
