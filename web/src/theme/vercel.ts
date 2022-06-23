import { createTheme } from '@mui/material/styles'
import { AppTheme } from '.'

const { palette } = createTheme()

export const theme: AppTheme = {
  dark: {
    palette: {
      mode: 'dark',
      primary: palette.augmentColor({
        color: {
          main: 'rgb(19,116,240)',
          contrastText: 'rgb(255,255,255)',
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: 'rgb(255,255,255)',
          contrastText: 'rgb(0,0,0)',
        },
      }),
      text: {
        primary: '#e6e1e6',
        secondary: '#e6e1e6',
      },
      background: {
        default: 'rgb(17,17,17)',
        paper: 'rgb(17,17,17)',
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
      divider: '#938f99',
      upvote: palette.augmentColor({
        color: {
          main: '#006e10',
          contrastText: 'rgb(255,255,255)',
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: '#ba1b1b',
          contrastText: 'rgb(255,255,255)',
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: 'rgb(0,0,0)',
          contrastText: 'rgb(255,255,255)',
        },
      }),
      containerSecondary: palette.augmentColor({
        color: {
          main: 'rgb(0,0,0)',
          contrastText: '#e7dff8',
        },
      }),
    },
  },
  light: {
    palette: {
      mode: 'light',
      primary: palette.augmentColor({
        color: {
          main: 'rgb(19,116,240)',
          contrastText: '#ffffff',
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: 'rgb(0,0,0)',
          contrastText: '#ffffff',
        },
      }),
      text: {
        primary: 'rgb(0,0,0)',
        secondary: 'rgb(0,0,0)',
      },
      background: {
        default: 'rgb(250,250,250)',
        paper: 'rgb(250,250,250)',
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
          contrastText: '#313300',
        },
      }),
      divider: '#79757f',
      upvote: palette.augmentColor({
        color: {
          main: '#006e10',
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
          main: 'rgb(255,255,255)',
          contrastText: 'rgb(0,0,0)',
        },
      }),
      containerSecondary: palette.augmentColor({
        color: {
          main: '#e7dff8',
          contrastText: '#1d192b',
        },
      }),
    },
  },
}
