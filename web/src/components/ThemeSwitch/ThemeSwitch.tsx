import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useTheme } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import { ColorModeContext } from 'src/theme/ThemeProvider'

const ThemeSwitch = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <>
        <ToggleButton style={{borderRadius: '50px', border: 'none'}} title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"} value="check" onChange={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' && <LightModeIcon color={'secondary'} />}
          {theme.palette.mode === 'light' && <DarkModeIcon color={'secondary'} />}
        </ToggleButton>
    </>
  )
}

export default ThemeSwitch
