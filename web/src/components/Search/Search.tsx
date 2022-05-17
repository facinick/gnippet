
import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import throttle from 'lodash.throttle'
import parse from 'autosuggest-highlight/parse'
import { formatPages, formatTags, formatUsers } from 'src/utils/searchResultsUtils';

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
  type: string;
  id: number | string;
  label: string;
}

const Search = () => {

  const [value, setValue] = React.useState<SearchObject | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly SearchObject[]>([])

  const [executeSearch, { data }] = useLazyQuery(
    SearchQuery,
    {
      fetchPolicy: 'network-only'
    },
  );

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
        ) => {

          console.log(`executing search: ${request.input}`)
          executeSearch({
            variables: { filter: request.input }
          },)
        },
        400
      ),
    []
  )

  React.useEffect(()=> {

    if(!data) {
      return
    }

    console.log(`got data`)
    const options = [...formatUsers(data.users), ...formatPages(data.pages), ...formatTags(data.tags)]
    console.log(`setting options: ${options}`)
    setOptions(options)

  }, [data])

  React.useEffect(() => {

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue })
  }, [value, inputValue, fetch])

  return (
      <Autocomplete
        id="app-search"
        freeSolo
        filterOptions={(x) => x}

        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.label
        }

        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions

        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            label="Search users | pages | tags"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
  );
};

export default Search;