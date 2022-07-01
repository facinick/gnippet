import AddCommentIcon from '@mui/icons-material/AddComment'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  Form,
  FormError
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useRef, useState } from 'react'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { polka } from 'src/styles/backgrounds'

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      createdAt
      score
      author {
        username
      }
      parentCommentId
    }
  }
`

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.palette.containerSecondary.contrastText,
  backgroundColor: polka({
    color: '#4057FF',
    background: theme.palette.containerSecondary.main,
  }),
  '& .MuiInputBase-root': {
    color: theme.palette.containerSecondary.contrastText,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.containerSecondary.contrastText,
  },
}))

interface Props {
  authorId: number
  snippetId: number
  parentCommentId?: number
  authorUsername: string
}

const CommentForm = ({
  authorId,
  snippetId,
  parentCommentId,
  authorUsername,
}: Props) => {
  const formRef = useRef<HTMLFormElement>()

  const [body, setBody] = useState('')
  const [bodyError, setBodyError] = useState(false)
  const [bodyErrorMessage, setBodyErrorMessage] = useState('')

  const onBodyInput = (event) => {
    const value = event.target.value
    setBody(value)
    setBodyError(false)
    setBodyErrorMessage('')
  }

  const areInputsValid = () => {
    if (!body) {
      setBodyError(true)
      setBodyErrorMessage('Body cannot be empty!')
    }

    if (!body) {
      return false
    }

    return true
  }

  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Comment Created!')
    },
    update(cache, { data: { createComment } }) {
      const { snippet } = cache.readQuery({
        query: COMMENTS_QUERY,
        variables: {
          id: snippetId,
          snippetId,
        },
      })

      const newComments = [createComment].concat(snippet.comments)
      const newSnippet = { ...snippet, comments: newComments }

      cache.writeQuery({
        query: COMMENTS_QUERY,
        data: {
          snippet: newSnippet,
          variables: {
            id: snippetId,
            snippetId,
          },
        },
      })
    },
  })

  const onSubmit = () => {
    if (!areInputsValid()) {
      return
    }

    createComment({
      variables: { input: { parentCommentId, snippetId, authorId, body } },
    })
    formRef.current.reset()
  }

  //////

  return (
    <React.Fragment>
      <Stack
        padding={'15px 0px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        direction={'row'}
      >
        <Typography variant="h6">Add Comment</Typography>
        <i>
          <Typography variant="caption">as @{authorUsername}</Typography>
        </i>
      </Stack>
      <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <FormError error={error} />

        <Stack direction="column" spacing={1}>
          <StyledTextField
            label="Comment"
            disabled={loading}
            error={bodyError}
            helperText={bodyError ? bodyErrorMessage : ''}
            required
            onInput={onBodyInput}
            multiline
            size="small"
            rows={4}
          />

          <Button
            aria-label="Add Comment"
            title={'Add Comment'}
            endIcon={<AddCommentIcon />}
            size={'small'}
            variant="contained"
            onSubmit={onSubmit}
            disabled={loading}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </React.Fragment>
  )
}

export default CommentForm
