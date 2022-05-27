import Typography from "@mui/material/Typography"

interface Props {
  value: number
}

const NumberOfComments = ({value}: Props) => {

  const singular = value === 1
  const word = singular ? 'comment' : 'comments'

  return (
    <>
      <Typography marginTop={24} variant="body2">{value} {word}</Typography>
    </>
  )
}

export default NumberOfComments
