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
import { useApolloClient } from '@apollo/client'
import { UserProfileQuery } from '../UserCell/UserCell'

interface Props {
  userId: number
  username: string
}

export const UpdateUserBioMutation = gql`
  mutation updateUser($id: Int!, $input: UpdateUserInput!) {
    user: updateUser(id: $id, input: $input) {
      bio
    }
  }
`

const ProfileBio = ({ userId, username }: Props) => {
  const [edit, toggleEdit] = React.useState<boolean>(false)
  const [_bio, setBio] = React.useState<string>('')
  const textAreaRef = React.useRef(null)
  const [beforeChange, setBeforechange] = useState('')
  const client = useApolloClient()

  const userVotesQueryResults = client.readQuery({
    query: UserProfileQuery,
    variables: {
      username,
    },
  })

  useEffect(() => {
    if(userVotesQueryResults?.data) {
      console.log(userVotesQueryResults?.data)
      setBio(userVotesQueryResults?.data.user.bio)
      setBeforechange(userVotesQueryResults?.data.user.bio)
    }
  }, [userVotesQueryResults])

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
