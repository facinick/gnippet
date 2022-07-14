import { useReactiveVar } from '@apollo/client'
import { useTheme } from '@emotion/react'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { CircularProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Form, FormError } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useRef, useState } from 'react'
import { QUERY as SnippetsQuery } from 'src/components/SnippetsCell/SnippetsCell'
import TagsCell from 'src/components/TagsCell'
import { QUERY as TagsQuery } from 'src/components/TagsCell/TagsCell'
import { ITEMS_PER_PAGE, sortByVar } from 'src/localStore/homeFeedSortBy'
import LottieAnimation from 'src/lottie/Animation'
import { TagsSearchObject } from '../TagSearchAndAdd/TagSearchAndAdd'
import confettiAnimation from 'src/lottie/assets/confetti-spread.json'

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
  onSubmit?: () => void
}

const SnippetForm = ({ authorId, pageId, authorUsername, onSubmit }: Props) => {
  const sortBy = useReactiveVar(sortByVar)

  const formRef = useRef<HTMLFormElement>()
  const confettiAnimationRef = useRef<LottieAnimation>()
  const [tagsRef, setTagsRef] = useState()
  const bodyRef = useRef<HTMLInputElement>()
  const imageRef = useRef<HTMLImageElement>()
  const theme = useTheme()

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  // image url --------------------------------------------------------
  const [imageUrl, setImageUrl] = useState('')
  const [imageUrlValidating, setImagineUrlValidating] = useState(false)
  const [imageUrlError, setImageUrlError] = useState(false)
  const [imageUrlErrorMessage, setImageUrlErrorMessage] = useState('')
  const [imageUrlIsValid, setImageUrlIsValid] = useState(false)
  // ------------------------------------------------------------------
  const [body, setBody] = useState('')
  const [bodyError, setBodyError] = useState(false)
  const [bodyErrorMessage, setBodyErrorMessage] = useState('')
  const [tags, setTags] = useState<Array<TagsSearchObject>>([])
  // ------------------------------------------------------------------
  const [validating, setValidating] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
    setImageUrlIsValid(false)
  }

  const onBodyInput = (event) => {
    const value = event.target.value
    setBody(value)
    setBodyError(false)
    setBodyErrorMessage('')
  }

  const isImageUrlValid = async (): Promise<boolean> => {
    let isValid = false
    try {
      setImagineUrlValidating(true)
      await _valudateImageUrl()
      setImageUrlError(false)
      setImageUrlErrorMessage('')
      setImageUrlIsValid(true)
      isValid = true
    } catch (error) {
      setImageUrlError(true)
      setImageUrlErrorMessage('image url is invalid')
      setImageUrlIsValid(false)
      isValid = false
    } finally {
      setImagineUrlValidating(false)
    }
    return isValid
  }

  const _valudateImageUrl = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // no image url provided, it's valid
      if (imageUrl == '') {
        imageRef.current.removeAttribute('src')
        resolve()
      } else {
        // set src
        imageRef.current.src = imageUrl

        // image url provided is not valid
        imageRef.current.onerror = () => {
          imageRef.current.onerror = undefined
          reject()
        }

        // image url provided is valid
        imageRef.current.onload = () => {
          imageRef.current.onload = undefined
          resolve()
        }
      }
    })
  }

  const areInputsValid = async () => {
    if (!title) {
      setTitleError(true)
      setTitleErrorMessage('Title cannot be empty!')
    }

    if (!body) {
      setBodyError(true)
      setBodyErrorMessage('Body cannot be empty!')
    }

    const isImageUrlValidResponse = await isImageUrlValid()

    if (!title || !body || !isImageUrlValidResponse) {
      return false
    }

    return true
  }

  const [createSnippet, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      onSubmit?.()
      toast.success('Snippet Created!')
    },
    update(cache, { data: { createSnippet } }) {
      const cacheData = cache.readQuery({
        query: SnippetsQuery,
        variables: {
          skip: 0,
          take: ITEMS_PER_PAGE,
          sortBy: sortBy,
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

      let newSnippets = [createSnippet]
        .concat(snippets.data)
        .slice(0, ITEMS_PER_PAGE)

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
          take: ITEMS_PER_PAGE,
          sortBy: sortBy,
        },
      })
    },
  })

  const _onSubmit = async () => {
    setSubmitting(true)
    setValidating(true)
    const isValid = await areInputsValid()
    setValidating(false)
    if (!isValid) {
      return
    }

    await createSnippet({
      variables: { input: { pageId, authorId, body, title, tags, imageUrl } },
    })
    formRef.current.reset()
    tagsRef?.current.reset()
    resetImagePreview()
    setSubmitting(false)
  }

  const resetImagePreview = () => {
    imageRef.current.removeAttribute('src')
  }

  return (
    <Form ref={formRef} onSubmit={_onSubmit} config={{ mode: 'onBlur' }}>
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
        <Stack direction={'row'} spacing={0}>
          <img
            style={{
              display: 'none',
            }}
            ref={imageRef}
          />
          <StyledTextField
            label="Snippet"
            disabled={loading}
            error={bodyError}
            helperText={bodyError ? bodyErrorMessage : ''}
            required
            onInput={onBodyInput}
            multiline
            inputRef={bodyRef}
            fullWidth
            size="small"
            rows={4}
          />
        </Stack>
        <StyledTextField
          label={imageUrlError ? imageUrlErrorMessage : 'Image URL'}
          disabled={loading}
          error={imageUrlError}
          InputProps={{
            endAdornment: imageUrlValidating ? (
              <InputAdornment position="start">
                <CircularProgress size={'small'} />
              </InputAdornment>
            ) : (
              <></>
            ),
          }}
          onInput={onImageUrlInput}
          size="small"
        />
        <TagsCell
          disable={submitting}
          setTagsRef={setTagsRef}
          setTags={setTags}
        />
        <Box style={{ height: '4px' }} />
        <Stack direction={'row'} spacing={2}>
          <Button
            style={{
              transition: 'width 0.1s ease-out',
              borderRadius: '30px',
              width: submitting ? '200px' : '150px',
            }}
            aria-label="Post Snippet"
            title={'Post Snippet'}
            endIcon={<PostAddIcon />}
            size={'small'}
            variant="contained"
            onSubmit={onSubmit}
            disabled={loading || validating}
            type="submit"
          >
            {submitting ? 'Submitting...' : 'Submit'}
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
