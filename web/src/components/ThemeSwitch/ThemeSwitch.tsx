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
        OTransform: 'rotate(0deg)',
        msTransform: 'rotate(0deg)',
        MozTransform: 'rotate(0deg)',
        WebkitTransform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
        OTransform: 'rotate(360deg)',
        msTransform: 'rotate(360deg)',
        MozTransform: 'rotate(360deg)',
        WebkitTransform: 'rotate(360deg)',
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
