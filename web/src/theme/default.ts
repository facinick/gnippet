import { createTheme } from '@mui/material/styles'
import { AppTheme } from '.'

const { palette } = createTheme()

const defaultLight = createTheme({
  palette: {
    mode: 'light',
  },
});

const defaultDark = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const theme: AppTheme = {
  dark: {
    palette: {
      ...defaultDark.palette,
      upvote: palette.augmentColor({
        color: {
          main: '#66bb6a',
          contrastText: 'rgba(0,0,0,0.87)',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#f44336',
          contrastText: '#fff',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: '#121212',
          contrastText: 'white',
        },
      }),
    }
  },
  light: {
    palette: {
      ...defaultLight.palette,
      upvote: palette.augmentColor({
        color: {
          main: '#2e7d32',
          contrastText: '#32009a',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#d32f2f',
          contrastText: '#fff',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: '#fff',
          contrastText: '#black',
        },
      }),
    }
  }
}
