import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useReactiveVar } from '@apollo/client';
import { setSortBy, sortByVar } from 'src/localStore/homeFeedSortBy';

const HomeFeedSortBy = () => {

  const sortBy = useReactiveVar(sortByVar);

  const handleChange = (event, stuff) => {
    setSortBy({field: stuff.props.value})
  }

  return (
    <FormControl size={'small'} style={{maxWidth: '200px'}}>
      <InputLabel >Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value={'new'}>new</MenuItem>
        <MenuItem value={'activity'}>activity</MenuItem>
        <MenuItem value={'score'}>score</MenuItem>
      </Select>
    </FormControl>
  )
}

export default HomeFeedSortBy
