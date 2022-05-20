import Stack from '@mui/material/Stack'
import {
  Form,
  FormError,
  Label,
  TextAreaField,
  Submit,
  SubmitHandler,
  FieldError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY as COMMENTS_QUERY } from 'src/components/CommentsCell'
import { useEffect, useRef } from 'react'

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id,
      body,
      createdAt,
      score,
      author {
        username
      }
      parentCommentId
    }
  }
`

interface FormValues {
  body: string
}

interface Props {
  authorId: number
  snippetId: number
  parentCommentId?: number
}

const CommentForm = ({ authorId, snippetId, parentCommentId }: Props) => {

  const formRef = useRef<HTMLFormElement>()

  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Comment Created!')
    },
    refetchQueries: [
      {
        query: COMMENTS_QUERY,
        variables: {
          id: snippetId,
          snippetId,
        }
      }
    ]
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { parentCommentId, snippetId, authorId, ...input }}})
    formRef.current.reset()
  }

  return (
    <div>
      <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <FormError
          error={error} />
          <Stack direction="column" spacing={1}>
            <Label
              name="body"
              errorClassName="error"
              htmlFor="body" >
              Comment
            </Label>
            <TextAreaField
              name="body"
              errorClassName="error"
              validation={{ required: true }} />
            <FieldError name="body"
            className="error" />

            <Submit
              disabled={loading} >
              Submit
            </Submit>
          </Stack>
      </Form>
    </div>
  )
}

export default CommentForm