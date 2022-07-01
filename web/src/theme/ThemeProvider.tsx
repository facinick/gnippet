import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect } from 'react'
import { color as ThemeColors } from './index'
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  shuffleColorTheme: () => {},
})

type ThemeProviderProps = {
  children?: React.ReactNode
}

export default function ToggleColorMode(props: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [mode, setMode] = React.useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  )
  const [theme, setTheme] = React.useState<0 | 1 | 2 | 3 | 4>(0)

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
      shuffleColorTheme: () => {
        setTheme((prevTheme) => ((prevTheme + 1) % 5) as 0 | 1 | 2 | 3 | 4)
      },
    }),
    []
  )

  const _theme = React.useMemo(
    () => createTheme(ThemeColors[theme][mode] as ThemeOptions),
    [mode, theme]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={_theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
