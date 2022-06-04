import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import { useMemo } from 'react'

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
import useMediaQuery from '@mui/material/useMediaQuery';

import PostAddIcon from '@mui/icons-material/PostAdd'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { createRef, useRef, useState } from 'react'
import { QUERY as SnippetsQuery } from 'src/components/SnippetsCell/SnippetsCell'
import { QUERY as TagsQuery } from 'src/components/TagsCell/TagsCell'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { CircularProgress, Typography } from '@mui/material'
import { TagsSearchObject } from '../TagSearchAndAdd/TagSearchAndAdd'
import TagsCell from 'src/components/TagsCell'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'
import { Snippet } from 'types/graphql'

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  backgroundColor: theme.palette.containerPrimary.main,
  '& .MuiInputBase-root': {
    color: theme.palette.containerPrimary.contrastText,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.containerPrimary.contrastText,
  },
}))

const CREATE = gql`
  mutation CreateSnippetMutation($input: CreateSnippetInput!) {
    createSnippet(input: $input) {
      id
      title
      body
      createdAt
      activity
      score
      imageUrl
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
  const imageRef = useRef<HTMLImageElement>()
  const theme = useTheme()
  const horizontallyAlignImgAndBody = useMediaQuery(theme.breakpoints.up('sm'));

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  // image url --------------------------------------------------------
  const [imageUrl, setImageUrl] = useState('')
  const [imageUrlValidating, setImagineUrlValidating] = useState(false)
  const [imageUrlError, setImageUrlError] = useState(false)
  const [imageUrlErrorMessage, setImageUrlErrorMessage] = useState('')
  const [imageUrlValid, setImageUrlValid] = useState(true)
  const [imageUrlInteracting, setImageUrlInteracting] = useState(false)
  // ------------------------------------------------------------------
  const [body, setBody] = useState('')
  const [bodyError, setBodyError] = useState(false)
  const [bodyErrorMessage, setBodyErrorMessage] = useState('')
  const [tags, setTags] = useState<Array<TagsSearchObject>>([])

  const [previous, setPrevious] = useState('')

  const onTitleInput = (event) => {
    const value = event.target.value
    setTitle(value)
    setTitleError(false)
    setTitleErrorMessage('')
  }

  const onImageUrlInput = (event) => {
    const value = event.target.value.trim()
    setImageUrl(value)
    setImagineUrlValidating(false)
    setImageUrlError(false)
    setImageUrlErrorMessage('')
    if (value == '') {
      setImageUrlValid(true)
    } else {
      setImageUrlValid(false)
    }
  }

  const onBodyInput = (event) => {
    const value = event.target.value
    setBody(value)
    setBodyError(false)
    setBodyErrorMessage('')
  }

  const valudateImageUrl = () => {
    setImageUrlInteracting(false)
    if(imageUrlValidating) {
      return
    }

    setImagineUrlValidating(true)
    // if (imageUrl == previous) {
    //   setImagineUrlValidating(false)
    //   return
    // }

    if (imageUrl == '') {
      imageRef.current.removeAttribute('src')
      setPrevious("")
      setImagineUrlValidating(false)
      setImageUrlError(false)
      setImageUrlErrorMessage('')
      setImageUrlValid(true)
      return
    }

    console.log(`validate image url... [start]`)
    imageRef.current.src = imageUrl

    imageRef.current.onerror = () => {
      setImagineUrlValidating(false)
      setImageUrlError(true)
      setImageUrlErrorMessage('image url is invalid')
      setImageUrlValid(false)
      console.log(`validate image url... [done] Error`)
      imageRef.current.onerror = undefined
      return
    }

    imageRef.current.onload = () => {
      setImagineUrlValidating(false)
      setImageUrlError(false)
      setImageUrlErrorMessage('')
      setImageUrlValid(true)
      console.log(`validate image url... [done] Success`)
      imageRef.current.onload = undefined
      return
    }
  }

  const areInputsValid = () => {
    if (!title) {
      setTitleError(true)
      setTitleErrorMessage('Title cannot be empty!')
    }

    if (!body) {
      setBodyError(true)
      setBodyErrorMessage('Body cannot be empty!')
    }

    if (imageUrl && !imageUrlValid) {
      return false
    }

    if (!title || !body || (imageUrl && imageUrlError)) {
      return false
    }

    console.log(`valid!`)
    return false
    return true
  }

  const [createSnippet, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast.success('Snippet Created!')
    },
    update(cache, { data: { createSnippet } }) {
      const cacheData: { snippets: { data: Array<Snippet>; count: number } } =
        cache.readQuery({
          query: SnippetsQuery,
          variables: {
            skip: 0,
            take: 5,
          },
        })

      // cache could be empty when creating the first snippet
      const snippets = cacheData ? cacheData.snippets : { data: [], count: 0 }

      // older existing tags
      const { tags } = cache.readQuery({
        query: TagsQuery,
      })
      // has newly created tags + maybe older ones
      const addedTags = createSnippet.tags.filter(
        (tago) => !tags.some((tag) => tag.id === tago.id)
      )
      // pick these ones from

      if (addedTags.length > 0) {
        cache.writeQuery({
          query: TagsQuery,
          data: {
            tags: [...tags, ...addedTags],
          },
        })
      }

      let newSnippets = [createSnippet].concat(snippets.data).slice(0, 5)

      cache.writeQuery({
        query: SnippetsQuery,
        data: {
          snippets: {
            data: newSnippets,
            count: snippets.count + 1,
          },
        },
        variables: {
          skip: 0,
          take: 5,
        },
      })
    },
  })

  const onSubmit = () => {
    if (!areInputsValid()) {
      return
    }

    createSnippet({
      variables: { input: { pageId, authorId, body, title, tags } },
    })
    formRef.current.reset()
  }

  const hideImagePreview = !imageUrlValid || imageUrl === ""

  return (
    <Form ref={formRef} onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
      <FormError error={error} />
      <Stack direction="column" spacing={1}>
        <StyledTextField
          name="title"
          required
          disabled={loading}
          error={titleError}
          helperText={titleError ? titleErrorMessage : ''}
          onInput={onTitleInput}
          size="small"
          label={'Title'}
        />
        {/* <div>
          <div> {`imageUrl: ${imageUrl}`}</div>
          <div> {`imageUrlError: ${imageUrlError}`}</div>
          <div> {`imageUrlErrorMessage: ${imageUrlErrorMessage}`}</div>
          <div> {`imageUrlValid: ${imageUrlValid}`}</div>
          <div> {`imageUrlValidating: ${imageUrlValidating}`}</div>
        </div> */}
        <Stack direction={horizontallyAlignImgAndBody ? 'row' : 'column'} spacing={hideImagePreview ? 0 : 1}>
          <Paper
          variant={'outlined'}
            style={{
              width: horizontallyAlignImgAndBody ? '200px' : '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              display: hideImagePreview ? 'none' : 'flex',
            }}
          >
            {
              <img
                style={{
                  width: '100%',
                  display: hideImagePreview ? 'none' : 'block',
                }}
                ref={imageRef}
              />
            }
            {imageUrlValidating && <CircularProgress />}
          </Paper>

          <StyledTextField
            label="Snippet"
            disabled={loading}
            error={bodyError}
            helperText={bodyError ? bodyErrorMessage : ''}
            required
            onInput={onBodyInput}
            multiline
            fullWidth
            size="small"
            rows={4}
          />
        </Stack>
        <StyledTextField
          label={imageUrlError ? imageUrlErrorMessage : "Image URL"}
          disabled={loading}
          error={imageUrlError}
          // helperText={imageUrlError ? imageUrlErrorMessage : ''}
          onBlur={valudateImageUrl}
          onFocus={() => { setImageUrlInteracting(true); setPrevious(imageUrl)}}
          InputProps={{
            endAdornment: imageUrlValidating ? (
              <InputAdornment position="start">
                <CircularProgress />
              </InputAdornment>
            ) : (
              <></>
            ),
          }}
          onInput={onImageUrlInput}
          size="small"
        />
        <TagsCell setTags={setTags} />
        <Box style={{ height: '4px' }} />
        <Stack direction={'row'} spacing={2}>
          <Button
            style={{ borderRadius: '30px', width: '150px' }}
            aria-label="Post Snippet"
            title={'Post Snippet'}
            endIcon={<PostAddIcon />}
            size={'small'}
            variant="contained"
            onSubmit={onSubmit}
            disabled={loading || imageUrlInteracting || imageUrlValidating}
            type="submit"
          >
            Submit
          </Button>
          <i>
            <Typography variant="caption">as @{authorUsername}</Typography>
          </i>
        </Stack>
      </Stack>
    </Form>
  )
}

export default SnippetForm
