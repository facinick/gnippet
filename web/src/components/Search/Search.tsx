
import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import throttle from 'lodash.throttle'
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

  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly SearchObject[]>([])

  const [executeSearch, { data, loading, error }] = useLazyQuery(
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

    console.log(data)

    const options = [...formatUsers(data.users), ...formatPages(data.pages), ...formatTags(data.tags)]
    console.log(`setting options: ${options}`)
    setOptions(options)

  }, [data])

  React.useEffect(() => {

    if (inputValue === '') {
      setOptions([])
      return undefined
    }

    fetch({ input: inputValue })
  }, [inputValue, fetch])


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
        // includeInputInList
        // filterSelectedOptions

        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}

        onChange={(event: any, newValue: SearchObject | null) => {
          console.log(newValue)
        }}

        loading={loading}

        disableClearable={true}

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