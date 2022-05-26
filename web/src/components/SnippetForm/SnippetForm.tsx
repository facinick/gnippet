import Stack from '@mui/material/Stack'
import {
  Form,
  FormError,
  Label,
  // TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  FieldError,
} from '@redwoodjs/forms'
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextField from '@mui/material/TextField';

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useRef, useState } from 'react'
import { QUERY as SnippetsQuery } from 'src/components/SnippetsCell/SnippetsCell'
import Button from '@mui/material/Button';
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

  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState("")
  const [body, setBody] = useState("")
  const [bodyError, setBodyError] = useState(false)
  const [bodyErrorMessage, setBodyErrorMessage] = useState("")

  const onTitleInput = (event) => {
    const value = event.target.value
    setTitle(value)
    setTitleError(false)
    setTitleErrorMessage("")
  }

  const onBodyInput = (event) => {
    const value = event.target.value
    setBody(value)
    setBodyError(false)
    setBodyErrorMessage("")
  }

  const areInputsValid = () => {
    if(!title) {
      setTitleError(true)
      setTitleErrorMessage("Title cannot be empty!")
    }

    if(!body) {
      setBodyError(true)
      setBodyErrorMessage("Body cannot be empty!")
    }

    if(!title || !body) {
      return false
    }

    return true
  }

  const [createSnippet, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Snippet Created!')
    },
    update(cache, { data: { createSnippet } }) {

      const { snippets } = cache.readQuery({
        query: SnippetsQuery,
        variables: {
          skip: 0,
          take: 5,
        }
      })

      let newSnippets = [createSnippet].concat(snippets.data).slice(0,5)

      cache.writeQuery({
        query: SnippetsQuery,
        data: {
          snippets: {
            data: newSnippets,
            count: snippets.count + 1
          }
        },
        variables: {
          skip: 0,
          take: 5,
        }
      });
    },
  })

  const onSubmit = () => {
    if(!areInputsValid()) {
      return
    }
    createSnippet({ variables: { input: { pageId, authorId, body, title }}})
    formRef.current.reset()
  }

  return (
    <div >
      <h3 style={{marginTop: 0}}>Post Snippet</h3>
      <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <FormError
          error={error} />

        <Stack direction="column" spacing={1}>

          <TextField
            name="title"
            required
            disabled={loading}
            error={titleError}
            helperText={titleError ? titleErrorMessage : ""}
            onInput={onTitleInput}
            size="small"
            label={'Title'}
            />

          <TextField
            label="Snippet"
            disabled={loading}
            error={bodyError}
            helperText={bodyError ? bodyErrorMessage : ""}
            required
            onInput={onBodyInput}
            multiline
            size="small"
            rows={4}
          />

          <Button aria-label='Post Snippet' title={'Post Snippet'} endIcon={<PostAddIcon />} size={'small'} variant="contained" onSubmit={onSubmit} disabled={loading} type="submit">Submit</Button>

        </Stack>
      </Form>
    </div>
  )
}

export default SnippetForm