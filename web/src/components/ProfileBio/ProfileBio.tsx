import {
  Box,
  Button,
  ClickAwayListener,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  bio: string
}

const ProfileBio = ({ bio }: Props) => {
  const [edit, toggleEdit] = React.useState<boolean>(false)
  const [_bio, setBio] = React.useState<string>(bio)
  const textAreaRef = React.useRef(null)
  const [beforeChange, setBeforechange] = useState(bio)

  const onEditToggle = () => {
    if (!edit) {
      textAreaRef?.current.focus()
      setBeforechange(_bio)
    } else {
      console.log(`save: ${_bio}`)
    }
    toggleEdit((oldValue) => !oldValue)
  }

  const onTextInput = (event) => {
    setBio(event.target.value)
  }

  const onClickAway = () => {
    if (!edit) {
      return
    }
    setBio(beforeChange)
    toggleEdit(false)
  }

  return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Box style={{ position: 'relative', maxWidth: '420px', minWidth: '300px', width: '100%' }}>
          <TextField
            multiline
            rows={3}
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
