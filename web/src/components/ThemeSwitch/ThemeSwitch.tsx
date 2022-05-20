import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from 'src/theme/ThemeProvider'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ToggleButton from '@mui/material/ToggleButton'

const ThemeSwitch = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <>
        <ToggleButton title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"} value="check" onChange={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' && <LightModeIcon />}
          {theme.palette.mode === 'light' && <DarkModeIcon />}
        </ToggleButton>
    </>
  )
}

export default ThemeSwitch
