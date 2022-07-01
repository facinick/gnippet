import { useApolloClient } from '@apollo/client'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { QUERY as TagsQuery } from 'src/components/TagsCell/TagsCell'
import { Tag } from 'types/graphql'

import Chip, { ChipProps } from '@mui/material/Chip'
import Paper, { PaperProps } from '@mui/material/Paper'

import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  backgroundColor: theme.palette.containerPrimary.main,
  color: theme.palette.containerPrimary.contrastText,
}))

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  '& .MuiChip-label': {
    paddingBottom: '3px',
  },
}))

type TagSearchId = Pick<Tag, 'id'>
type TagSearchName = Pick<Tag, 'name'>

export type TagsSearchObject = Partial<TagSearchId> & Required<TagSearchName>

const filter = createFilterOptions<TagsSearchObject>()

interface Props {
  setTags: (tags) => void
  disable: boolean
}

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

const TagSearchAndAdd = forwardRef(({ setTags, disable }: Props, ref) => {
  const autoCompleteRef = useRef()
  const [localTags, setLocalTags] = useState<
    Array<TagSearchId & TagSearchName>
  >([])
  //@ts-ignore
  const tagsWithoutTypename = localTags.map(({ __typename, ...rest }) => {
    return rest
  })

  const [options, setOptions] =
    React.useState<readonly TagsSearchObject[]>(tagsWithoutTypename)

  const client = useApolloClient()

  const data = client.readQuery({
    query: TagsQuery,
  })

  const [values, setValues] = React.useState<string[]>([])

  const onChange = (_, value) => {
    setValues(value)
    setTags(value)
  }
  const clearSelected = () => {
    setValues([])
  }

  const reset = () => {
    console.log(`done`)
    clearSelected()
    setTags([])
  }

  useImperativeHandle(ref, () => ({
    reset() {
      console.log(`calling resest`)
      reset()
    },
  }))

  useEffect(() => {
    if (!data?.tags) {
      return
    }

    const typenameRemovedTags = data?.tags.map(({ __typename, ...rest }) => {
      return rest
    })

    setLocalTags(typenameRemovedTags)
    setOptions(typenameRemovedTags)
  }, [data])

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={options}
      freeSolo
      value={values}
      disabled={disable}
      size="small"
      ref={autoCompleteRef}
      filterSelectedOptions
      PaperComponent={({ children }) => <StyledPaper>{children}</StyledPaper>}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      renderTags={(value: readonly TagsSearchObject[], getTagProps) =>
        value.map((option: TagsSearchObject, index: number) => (
          <StyledChip
            label={option.name}
            {...getTagProps({ index })}
            size={'small'}
            variant="filled"
            color="secondary"
          />
        ))
      }
      filterOptions={(options, params) => {
        // const newInputValue = params.inputValue.trim().replaceAll(" ", "-").replaceAll(".", "")
        const newInputValue = params.inputValue
          .trim()
          .replace(/[^a-zA-Z -]/g, '')
          .replaceAll(' ', '-')
          .replaceAll('---', '--')
          .replaceAll('--', '-')
          .toLowerCase()
        params.inputValue = newInputValue

        const filtered = filter(options, params)

        if (newInputValue !== '' && filtered.length === 0) {
          filtered.push({
            name: `${newInputValue}`,
          })
        }
        return filtered
      }}
      disableClearable
      onChange={onChange}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          size={'small'}
          label="Tags"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  )
})

export default TagSearchAndAdd
