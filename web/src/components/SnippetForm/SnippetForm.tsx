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

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useRef, useState } from 'react'
import { QUERY as SnippetsQuery } from 'src/components/SnippetsCell/SnippetsCell'
import { QUERY as TagsQuery } from 'src/components/TagsCell/TagsCell'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { TagsSearchObject } from '../TagSearchAndAdd/TagSearchAndAdd';
import TagsCell from 'src/components/TagsCell'
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  backgroundColor: theme.palette.containerPrimary.main,
  "& .MuiInputBase-root": {
    color: theme.palette.containerPrimary.contrastText,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.containerPrimary.contrastText,
  }
}));

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
      tags {
        id
        name
      }
    }
  }
`

interface Props {
  authorId: number
  authorUsername: string
  pageId?: number
}

const SnippetForm = ({ authorId, pageId, authorUsername }: Props) => {

  const formRef = useRef<HTMLFormElement>()

  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState("")
  const [body, setBody] = useState("")
  const [bodyError, setBodyError] = useState(false)
  const [bodyErrorMessage, setBodyErrorMessage] = useState("")
  const [tags, setTags] = useState<Array<TagsSearchObject>>([])

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

      // older existing tags
      const { tags } = cache.readQuery({
        query: TagsQuery,
      })
      // has newly created tags + maybe older ones
      const addedTags = createSnippet.tags.filter((tago) => !tags.some(tag => tag.id === tago.id))
      // pick these ones from

      if(addedTags.length > 0) {
        cache.writeQuery({
          query: TagsQuery,
          data: {
            tags: [...tags, ...addedTags]
          },
        });
      }

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

    createSnippet({ variables: { input: { pageId, authorId, body, title, tags }}})
    formRef.current.reset()
  }

  return (
    <React.Fragment >
      <Stack padding={'15px 0px'} alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
        <Typography variant='h6'>Post Snippet</Typography>
        <i><Typography variant='caption'>as @{authorUsername}</Typography></i>
      </Stack>
      <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <FormError
          error={error} />

        <Stack direction="column" spacing={1}>

          <StyledTextField
            name="title"
            required
            disabled={loading}
            error={titleError}
            helperText={titleError ? titleErrorMessage : ""}
            onInput={onTitleInput}
            size="small"
            label={'Title'}
            />

          <StyledTextField
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

          <TagsCell setTags={setTags} />

          <Button aria-label='Post Snippet' title={'Post Snippet'} endIcon={<PostAddIcon />} size={'small'} variant="contained" onSubmit={onSubmit} disabled={loading} type="submit">Submit</Button>

        </Stack>
      </Form>
    </React.Fragment>
  )
}

export default SnippetForm