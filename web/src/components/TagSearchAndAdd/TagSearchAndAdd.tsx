import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { Tag } from 'types/graphql'

type TagSearchId = Pick<Tag, 'id'>
type TagSearchName = Pick<Tag, 'name'>

export type TagsSearchObject = Partial<TagSearchId> & Required<TagSearchName>

const filter = createFilterOptions<TagsSearchObject>();

interface Props {
  // these tags are coming from server, they have all the ids
  tags: Array<TagSearchId & TagSearchName>
  setTags: (tags) => void
}

const TagSearchAndAdd = ({ tags, setTags }: Props) => {

  const tagsWithoutTypename = tags.map(({__typename, ...rest}) => { return rest })
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly TagsSearchObject[]>(tagsWithoutTypename)
  const onSelect = (event: any, newValue: Array<TagsSearchObject> | null) => {
    setTags(newValue)
  }

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={options}
      freeSolo
      size='small'
      filterSelectedOptions
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      renderTags={(value: readonly TagsSearchObject[], getTagProps) =>
        value.map((option: TagsSearchObject, index: number) => (
          <Chip
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
