import Stack from '@mui/material/Stack'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { useRef, useState } from 'react'
import { Button } from '@mui/material'
import { _Snippet, _SnippetWithVotes, _Vote } from 'src/gql_objects/gqlObjects'
import { Form, FormError } from '@redwoodjs/forms'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import ReplyIcon from '@mui/icons-material/Reply'

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.palette.containerSecondary.contrastText,
  backgroundColor: theme.palette.containerSecondary.main,
  '& .MuiInputBase-root': {
    color: theme.palette.containerSecondary.contrastText,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.containerSecondary.contrastText,
  },
}))

const CREATE = gql`
  mutation ReplyCommentMutation($input: CreateCommentInput!) {
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

interface Props {
  authorId: number
  authorUsername: string
  snippetId: number
  parentCommentId: number
}

const CommentReplyForm = ({
  authorId,
  authorUsername,
  snippetId,
  parentCommentId,
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

  const onSubmit = async () => {
    if (!areInputsValid()) {
      return
    }

    await createComment({
      variables: { input: { parentCommentId, snippetId, authorId, body } },
    })

    formRef.current.reset()
  }

  return (
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
          rows={2}
        />

        <Button
          aria-label="Add Comment"
          title={'Add Comment'}
          size={'small'}
          endIcon={<ReplyIcon />}
          variant="contained"
          onSubmit={onSubmit}
          disabled={loading}
          type="submit"
        >
          {`Reply to ${authorUsername}`}
        </Button>
      </Stack>
    </Form>
  )
}

export default CommentReplyForm
