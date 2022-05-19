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
  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Comment Created!')
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { parentCommentId, snippetId, authorId, ...input }}})
  }

  return (
    <div>
      <h3>Create a Comment</h3>
      <Form  onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
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