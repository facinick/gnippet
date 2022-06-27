import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Space from "../Space/Space"
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Box from "@mui/material/Box"

interface Props {
  timeInMinutes: number
}

const ReadingTime = ({ timeInMinutes }: Props) => {

  const minsText = timeInMinutes === 1 ? "min" : "mins"

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      title={`reading time is ${timeInMinutes} ${minsText}`}
    >
      <IconButton
        size={'small'}
        disableRipple
        disableTouchRipple
        disableFocusRipple
        color="secondary"
        aria-label={`reading time is ${timeInMinutes} ${minsText}`}
        component="span"
      >
        <AccessTimeIcon />
      </IconButton>
      <Typography style={{fontSize: '14px'}}>
        {timeInMinutes}
        <Space />
        {minsText}
      </Typography>
    </Box>
  )
}

export default ReadingTime
