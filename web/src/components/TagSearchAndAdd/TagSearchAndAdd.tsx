import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Tag } from 'types/graphql'
import { QUERY as TagsQuery } from 'src/components/TagsCell/TagsCell'
import { useApolloClient } from '@apollo/client'

import Chip, { ChipProps } from '@mui/material/Chip';
import Paper, { PaperProps } from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  backgroundColor: theme.palette.containerPrimary.main,
  color: theme.palette.containerPrimary.contrastText
}));

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  "& .MuiChip-label": {
    paddingBottom: '3px',
  },
}));

type TagSearchId = Pick<Tag, 'id'>
type TagSearchName = Pick<Tag, 'name'>

export type TagsSearchObject = Partial<TagSearchId> & Required<TagSearchName>

const filter = createFilterOptions<TagsSearchObject>();

interface Props {
  setTags: (tags) => void
}

const TagSearchAndAdd = ({ setTags }: Props) => {

  const [localTags, setLocalTags] = useState<Array<TagSearchId & TagSearchName>>([])
  //@ts-ignore
  const tagsWithoutTypename = localTags.map(({__typename, ...rest}) => { return rest })
  const [options, setOptions] = React.useState<readonly TagsSearchObject[]>(tagsWithoutTypename)
  const onSelect = (event: any, newValue: Array<TagsSearchObject> | null) => {
    setTags(newValue)
  }

  const client = useApolloClient();

  const data = client.readQuery({
    query: TagsQuery,
  });

  useEffect(() => {
    if(!data?.tags) {
      return
    }

    setLocalTags(data?.tags)
    setOptions(data?.tags)

  }, [data])

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={options}
      freeSolo
      size='small'
      filterSelectedOptions
      PaperComponent={({ children }) => (
          <StyledPaper>{children}</StyledPaper>
      )}
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
        const newInputValue = params.inputValue.trim().replace(/[^a-zA-Z -]/g, "").replaceAll(" ", '-').replaceAll("---", "--").replaceAll("--", "-").toLowerCase()
        params.inputValue = newInputValue

        const filtered = filter(options, params);

        if (newInputValue !== '' && filtered.length === 0) {
          filtered.push({
            name: `${newInputValue}`,
          });
        }
        return filtered;
      }}
      disableClearable
      onChange={onSelect}
      renderInput={(params) => (
        <TextField
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
}

export default TagSearchAndAdd
