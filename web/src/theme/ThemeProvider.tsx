import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect } from 'react'
import { Children } from 'src/types/children'
import ThemeStorage from 'src/utils/themeStorage'
import { color as ThemeColors } from './index'

export type Mode = 'light' | 'dark'
export type Theme = 0 | 1 | 2 | 3 | 4
type ThemeProviderProps = {
  children?: Children
}

const numberOfThemes = Object.keys(ThemeColors).length

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  shuffleColorTheme: () => {},
})

//TODO: prefersDarkMode is false at start, then is overriden.

export default function ToggleColorMode(props: ThemeProviderProps) {

  const localStorageTheme = ThemeStorage.getInstance().getTheme()
  const localStorageMode = ThemeStorage.getInstance().getMode()
  const hasLocalStorageTheme = ThemeStorage.getInstance().hasTheme()
  const hasLocalStorageMode = ThemeStorage.getInstance().hasMode()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [mode, setMode] = React.useState<Mode>(
    hasLocalStorageMode ? localStorageMode : prefersDarkMode ? 'dark' : 'light'
  )

  const [theme, setTheme] = React.useState<Theme>(
    hasLocalStorageTheme ? localStorageTheme : 0
  )

  useEffect(() => {
    console.log(prefersDarkMode)
    ThemeStorage.getInstance().setMode(prefersDarkMode ? 'dark' : 'light')
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          ThemeStorage.getInstance().setMode(
            prevMode === 'light' ? 'dark' : 'light'
          )
          return prevMode === 'light' ? 'dark' : 'light'
        })
      },
      shuffleColorTheme: () => {
        setTheme((prevTheme) => {
          ThemeStorage.getInstance().setTheme(
            (prevTheme + 1) % (numberOfThemes)
          )
          return ((prevTheme + 1) % (numberOfThemes) ) as Theme})
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
