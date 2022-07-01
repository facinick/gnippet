import ColorLensIcon from '@mui/icons-material/ColorLens';
import IconButton from '@mui/material/IconButton';
import { ColorModeContext } from 'src/theme/ThemeProvider';
const ThemeShuffle = () => {
  const colorMode = React.useContext(ColorModeContext)
  return (
    <IconButton title={'Change Theme'} style={{borderRadius: '50px', border: 'none'}} onClick={colorMode.shuffleColorTheme}>
      <ColorLensIcon color={'secondary'} />
    </IconButton>
  )
}

export default ThemeShuffle
