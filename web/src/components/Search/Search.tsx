import { gql, useLazyQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import TagIcon from '@mui/icons-material/Tag'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAuth } from '@redwoodjs/auth/dist/useAuth'
import { navigate, routes } from '@redwoodjs/router'
import throttle from 'lodash.throttle'
import React from 'react'
import {
  formatPages,
  formatTags,
  formatUsers
} from 'src/utils/searchResultsUtils'
export const SearchQuery = gql`
  query FindSearchQuery($filter: String!) {
    users(input: { filter: $filter }) {
      username
    }
    pages(input: { filter: $filter }) {
      id
      name
    }
    tags(input: { filter: $filter }) {
      id
      name
    }
  }
`

type SearchObject = {
  type: string
  id: number | string
  label: string
}

const Search = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly SearchObject[]>([])
  const theme = useTheme()
  const inputRef = React.useRef(null)

  const [executeSearch, { data, loading, error }] = useLazyQuery(SearchQuery, {
    fetchPolicy: 'network-only',
  })

  const searchHelperText =
    isAuthenticated && currentUser?.username
      ? `hi @${currentUser?.username}, search users and tags`
      : 'search users and tags'

  const fetch = React.useMemo(
    () =>
      throttle((request: { input: string }) => {
        executeSearch({
          variables: { filter: request.input },
        })
      }, 1000),
    []
  )

  React.useEffect(() => {
    if (!data) {
      return
    }

    const _options = [
      ...formatUsers(data.users),
      ...formatPages(data.pages),
      ...formatTags(data.tags),
    ]

    setOptions(_options)
  }, [data])

  React.useEffect(() => {
    if (inputValue === '') {
      setOptions([])
      return undefined
    }

    fetch({ input: inputValue })
  }, [inputValue, fetch])

  const clearInputValue = () => {
    setInputValue('')
  }

  const onSelect = (event: any, newValue: SearchObject | null) => {
    switch (newValue.type) {
      case 'users': {
        clearInputValue()
        navigate(routes.user({ username: newValue.id as string }))
        break
      }
      case 'pages': {
        clearInputValue()
        break
      }
      case 'tags': {
        clearInputValue()
        navigate(routes.tag({ name: newValue.label as string }))
        break
      }
      default:
    }
  }

  return (
    <Autocomplete
      id="app-search"
      freeSolo
      filterOptions={(x) => x}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.label
      }
      noOptionsText={'No results found'}
      groupBy={(option) => option.type}
      options={options}
      autoComplete
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {option.type === 'users' && (
            <Avatar
              sx={{ width: 24, height: 24, mr: 1, mt: '2px' }}
              src={`https://avatars.dicebear.com/api/bottts/${option.id}.svg`}
            />
          )}
          {option.type === 'tags' && (
            <TagIcon sx={{ width: 24, height: 24, mr: 1, mt: '2px' }} />
          )}
          <Typography>{option.label}</Typography>
          <br />
        </li>
      )}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      // inputValue={inputValue}
      onChange={onSelect}
      loading={loading}
      disableClearable={true}
      size={'small'}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          style={{
            // color: theme.palette.containerPrimary.contrastText,
            // backgroundColor: theme.palette.containerPrimary.main,
          }}
          ref={inputRef}
          placeholder={searchHelperText}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={'disabled'} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default Search
