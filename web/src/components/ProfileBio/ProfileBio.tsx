import {
  Box,
  Button,
  ClickAwayListener,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material'

interface Props {
  bio: string
}

const ProfileBio = ({ bio }: Props) => {
  const [edit, toggleEdit] = React.useState<boolean>(false)
  const [_bio, setBio] = React.useState<string>(bio)
  const textAreaRef = React.useRef(null)

  let beforeChange = bio

  const onEditToggle = () => {
    if (!edit) {
      textAreaRef?.current.focus()
      beforeChange = _bio
    }
    toggleEdit((oldValue) => !oldValue)
  }

  const onTextInput = (event) => {
    console.log(event.target.value)
    setBio(event.target.value)
  }

  const onClickAway = () => {
    if (!edit) {
      return
    }
    toggleEdit(false)
    setBio(beforeChange)
  }

  return (
      <ClickAwayListener style={{width: '100%', display: 'flex', justifyContent: 'center'}} onClickAway={onClickAway}>
        <Box style={{ position: 'relative', maxWidth: '420px', minWidth: '300px', width: '100%' }}>
          <TextField
            multiline
            maxRows={6}
            InputProps={{
              readOnly: !edit,
            }}
            focused={edit}
            fullWidth
            value={_bio}
            inputRef={textAreaRef}
            onChange={onTextInput}
          />
          <Button
            style={{ right: -70, position: 'absolute' }}
            onClick={onEditToggle}
            variant="text"
          >
            {edit && <Typography>Save</Typography>}
            {!edit && <Typography>Edit</Typography>}
          </Button>
        </Box>
      </ClickAwayListener>
  )
}

export default ProfileBio
