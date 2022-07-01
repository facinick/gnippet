import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

interface Props {
  timeInMinutes: number
}

const ReadingTime = ({ timeInMinutes }: Props) => {

  const minsText = timeInMinutes === 1 ? "minute" : "minutes"

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
      <Typography style={{ fontSize: '14px' }}>
        {timeInMinutes}
        {/* <Space /> */}
        {Array.from(minsText)[0]}
      </Typography>
    </Box>
  )
}

export default ReadingTime
