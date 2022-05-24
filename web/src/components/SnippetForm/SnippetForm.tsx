import Stack from '@mui/material/Stack'
import {
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  FieldError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useRef } from 'react'
import { QUERY as SnippetsQuery } from 'src/components/SnippetsCell/SnippetsCell'
const CREATE = gql`
  mutation CreateSnippetMutation($input: CreateSnippetInput!) {
    createSnippet(input: $input) {
      id
      title
      body
      createdAt
      activity
      score
      author {
        username
      }
    }
  }
`

interface FormValues {
  body: string
  authorId: number
  pageId?: number
  title: string
}

interface Props {
  authorId: number
  pageId?: number
}

const SnippetForm = ({ authorId, pageId }: Props) => {

  const formRef = useRef<HTMLFormElement>()

  const [createSnippet, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Snippet Created!')
    },
    update(cache, { data: { createSnippet } }) {

      const { snippets } = cache.readQuery({
        query: SnippetsQuery,
      })

      let newSnippets = [createSnippet].concat(snippets)

      cache.writeQuery({
        query: SnippetsQuery,
        data: {
          snippets: newSnippets
        },
      });
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createSnippet({ variables: { input: { pageId, authorId, ...input }}})
    formRef.current.reset()
  }

  return (
    <div >
      <h3 style={{marginTop: 0}}>Create a Snippet</h3>
      <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <FormError
          error={error} />

        <Stack direction="column" spacing={1}>

          <Label
            name="title"
            errorClassName="error"
            htmlFor="title" >
            Title
          </Label>
          <TextField
            name="title"
            errorClassName="error"
            validation={{ required: true }} />
          <FieldError
            name="title"
            className="error" />

          <Label
            name="body"
            errorClassName="error"
            htmlFor="body" >
            Snippet
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

export default SnippetForm