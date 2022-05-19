import { useTheme } from '@mui/material/styles';
import Button from "@mui/material/Button"
import { ColorModeContext } from "src/theme/ThemeProvider";

const ThemeSwitch = () => {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const buttonText = theme.palette.mode === 'dark' ? 'Light' : 'Dark'
  return (
    <Button onClick={colorMode.toggleColorMode} variant="text">{buttonText}</Button>
  )
}

export default ThemeSwitch
