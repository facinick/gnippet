import { useReactiveVar } from '@apollo/client'
import {
  FormControl,
  InputLabel, NativeSelect
} from '@mui/material'
import { setSortBy, sortByVar } from 'src/localStore/homeFeedSortBy'


const HomeFeedSortBy = () => {
  const sortBy = useReactiveVar(sortByVar)

  const handleChange = (event) => {
    setSortBy({ field: event.target.value })
  }

  return (
    <FormControl size={'small'} style={{ maxWidth: '200px' }}>
      <InputLabel variant="standard" htmlFor="native-home-feed-sort-by">
        Sort By
      </InputLabel>
      <NativeSelect
        value={sortBy}
        onChange={handleChange}
        inputProps={{
          name: 'Sort By',
          id: 'native-home-feed-sort-by',
          sx: {},
        }}
      >
        <option value={'new'}>new</option>
        <option value={'activity'}>activity</option>
        <option value={'score'}>score</option>
      </NativeSelect>
    </FormControl>
  )
}

export default HomeFeedSortBy
