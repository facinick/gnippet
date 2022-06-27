import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from 'src/theme/ThemeProvider'
import ColorLensIcon from '@mui/icons-material/ColorLens';
import IconButton from '@mui/material/IconButton';
const ThemeShuffle = () => {
  const colorMode = React.useContext(ColorModeContext)
  return (
    <IconButton title={'Change Theme'} style={{borderRadius: '50px', border: 'none'}} onClick={colorMode.shuffleColorTheme}>
      <ColorLensIcon color={'secondary'} />
    </IconButton>
  )
}

export default ThemeShuffle
