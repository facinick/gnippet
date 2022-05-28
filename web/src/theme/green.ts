import { createTheme } from '@mui/material/styles'
import { AppTheme } from '.'

const { palette } = createTheme()

export const theme: AppTheme = {
  dark: {
    palette: {
      mode: 'dark',
      primary: palette.augmentColor({
        color: {
          main: '#acd452',
          contrastText: '#253600',
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: '#c2caaa',
          contrastText: '#2c331c',
        },
      }),
      text: {
        primary: '#e4e2db',
        secondary: '#e4e2db',
      },
      background: {
        default: '#1b1c17',
        paper: '#1b1c17',
      },
      error: palette.augmentColor({
        color: {
          main: '#ffb4a9',
          contrastText: '#680003',
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
          main: '#0062a2',
          contrastText: '#ffffff',
        },
      }),
      warning: palette.augmentColor({
        color: {
          main: '#606200',
          contrastText: '#ffffff',
        },
      }),
      divider: '#909284',
      upvote: palette.augmentColor({
        color: {
          main: '#acd452',
          contrastText: '#253600',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#ffb4a9',
          contrastText: '#680003',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: '#374e00',
          contrastText: '#c8f16c',
        },
      }),
    },
  },
  light: {
    palette: {
      mode: 'light',
      primary: palette.augmentColor({
        color: {
          main: '#4a6800',
          contrastText: '#ffffff',
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: '#5a6147',
          contrastText: '#ffffff',
        },
      }),
      text: {
        primary: '#1b1c17',
        secondary: '#1b1c17',
      },
      background: {
        default: '#fefdf4',
        paper: '#fefcf4',
      },
      error: palette.augmentColor({
        color: {
          main: '#ba1b1b',
          contrastText: '#ffffff',
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
          contrastText: '#ffffff',
        },
      }),
      divider: '#75786a',
      upvote: palette.augmentColor({
        color: {
          main: '#4a6800',
          contrastText: '#ffffff',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#ba1b1b',
          contrastText: '#ffffff',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: '#c8f16c',
          contrastText: '#131f00',
        },
      }),
    },
  },
}
