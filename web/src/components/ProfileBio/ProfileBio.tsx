import {
  Box,
  Button,
  ClickAwayListener,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  bio: string
  userId: number
}

export const UpdateUserBioMutation = gql`
  mutation updateUser($id: Int!, $input: UpdateUserInput!) {
    user: updateUser(id: $id, input: $input) {
      bio
    }
  }
`

const ProfileBio = ({ bio, userId }: Props) => {
  const [edit, toggleEdit] = React.useState<boolean>(false)
  const [_bio, setBio] = React.useState<string>(bio)
  const textAreaRef = React.useRef(null)
  const [beforeChange, setBeforechange] = useState(bio)

  const [updateBio, { data, loading, error }] = useMutation(
    UpdateUserBioMutation,
    {
      onCompleted: () => {
        toast.success('Bio Updated!')
      },
      onError: () => {
        toast.success("Couldn't update bio...")
      },
    }
  )

  useEffect(() => {
    setBio(bio)
  }, [bio])

  const onEditToggle = () => {
    if (!edit) {
      textAreaRef?.current.focus()
      setBeforechange(_bio)
    } else {
      updateBio({
        variables: {
          input: {
            bio: _bio,
          },
          id: userId,
        },
      })
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
      <Box style={{ maxWidth: '420px', minWidth: '300px', width: '100%' }}>
        <TextField
          multiline
          InputProps={{
            readOnly: !edit,
          }}
          focused={edit}
          fullWidth
          value={_bio}
          inputRef={textAreaRef}
          onChange={onTextInput}
          disabled={loading}
        />
        <Button
          disabled={loading}
          onClick={onEditToggle}
          variant="text"
          size={'small'}
        >
          {edit && <Typography>save bio</Typography>}
          {!edit && <Typography>edit bio</Typography>}
        </Button>
      </Box>
    </ClickAwayListener>
  )
}

export default ProfileBio
