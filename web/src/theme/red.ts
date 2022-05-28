import { createTheme } from '@mui/material/styles'
import { AppTheme } from '.'

const { palette } = createTheme()

export const theme: AppTheme = {
  dark: {
    palette: {
      mode: 'dark',
      primary: palette.augmentColor({
        color: {
          main: '#ffb3b0',
          contrastText: '#68000c',
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: '#4fd8eb',
          contrastText: '#00363d',
        },
      }),
      text: {
        primary: '#E6E1E5',
        secondary: '#E6E1E5',
      },
      background: {
        default: '#1C1B1F',
        paper: '#1C1B1F',
      },
      error: palette.augmentColor({
        color: {
          main: '#F2B8B5',
          contrastText: '#601410',
        },
      }),
      success: palette.augmentColor({
        color: {
          main: '#79dd72',
          contrastText: '#003a03',
        },
      }),
      info: palette.augmentColor({
        color: {
          main: '#99cbff',
          contrastText: '#003257',
        },
      }),
      warning: palette.augmentColor({
        color: {
          main: '#cace09',
          contrastText: '#313300',
        },
      }),
      divider: '#938F99',
      upvote: palette.augmentColor({
        color: {
          main: '#bd0b25',
          contrastText: '#68000c',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#4fd8eb',
          contrastText: '#00363d',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: '#920016',
          contrastText: '#ffdad6',
        },
      }),
    },
  },
  light: {
    palette: {
      mode: 'light',
      primary: palette.augmentColor({
        color: {
          main: '#bd0b25',
          contrastText: '#ffffff',
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: '#006874',
          contrastText: '#ffffff',
        },
      }),
      text: {
        primary: '#1C1B1F',
        secondary: '#1C1B1F',
      },
      background: {
        default: '#FFFBFE',
        paper: '#fffbff',
      },
      error: palette.augmentColor({
        color: {
          main: '#B3261E',
          contrastText: '#FFFFFF',
        },
      }),
      success: palette.augmentColor({
        color: {
          main: '#006e10',
          contrastText: '#ffffff',
        },
      }),
      info: palette.augmentColor({
        color: {
          main: '#0062a2',
          contrastText: '#ffffff',
        },
      }),
      warning: palette.augmentColor({
        color: {
          main: '#606200',
          contrastText: '#313300',
        },
      }),
      divider: '#79747E',
      upvote: palette.augmentColor({
        color: {
          main: '#bd0b25',
          contrastText: '#ffffff',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#006874',
          contrastText: '#ffffff',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: '#ffdad6',
          contrastText: '#410005',
        },
      }),
    },
  },
}
