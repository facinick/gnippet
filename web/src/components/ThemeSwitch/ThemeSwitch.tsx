import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { styled, useTheme } from '@mui/material/styles'
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton'
import { ColorModeContext } from 'src/theme/ThemeProvider'

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(
  ({ theme }) => ({
    '@keyframes rotate': {
      from: {
        transform: 'rotate(0deg)',
        '-o-transform': 'rotate(0deg)',
        '-ms-transform': 'rotate(0deg)',
        '-moz-transform': 'rotate(0deg)',
        '-webkit-transform': 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
        '-o-transform': 'rotate(360deg)',
        '-ms-transform': 'rotate(360deg)',
        '-moz-transform': 'rotate(360deg)',
        '-webkit-transform': 'rotate(360deg)',
      },
    },
    animation: `rotate 20s linear infinite`,
    borderRadius: '50px',
    border: 'none',
    '&:hover': {
      animationPlayState: 'paused',
    },
  })
)

const ThemeSwitch = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <>
      <StyledToggleButton
        title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        value="check"
        onChange={colorMode.toggleColorMode}
      >
        {theme.palette.mode === 'dark' && <LightModeIcon color={'secondary'} />}
        {theme.palette.mode === 'light' && <DarkModeIcon color={'secondary'} />}
      </StyledToggleButton>
    </>
  )
}

export default ThemeSwitch
