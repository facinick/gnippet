import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

type ThemeProviderProps = {
  children?: React.ReactNode
}

export default function ToggleColorMode(props: ThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}