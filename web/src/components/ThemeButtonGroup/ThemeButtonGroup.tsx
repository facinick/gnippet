import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ThemeButtonGroup = () => {
  return (
    <ButtonGroup color={'secondary'} size={'small'} variant="outlined" aria-label="outlined primary button group">
      <Button >light</Button>
      <Button>dracula</Button>
    </ButtonGroup>
  )
}

export default ThemeButtonGroup
