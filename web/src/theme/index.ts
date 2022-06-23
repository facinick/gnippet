import { theme as green } from './green'
import { theme as blue } from './blue'
import { theme as _default } from './default'
import { theme as red } from './red'
import { theme as vercel } from './vercel'

import {  Palette, PaletteColor, ThemeOptions } from '@mui/material/styles';
// import { Palette } from '@mui/material/styles';
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
declare module "@mui/material/styles" {
  interface Palette {
    upvote?: PaletteColor;
    downvote?: PaletteColor;
    containerPrimary?: PaletteColor;
    containerSecondary?: PaletteColor;
  }
  interface PaletteOptions {
    upvote?: PaletteColor;
    downvote?: PaletteColor;
    containerPrimary?: PaletteColor;
    containerSecondary?: PaletteColor;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    upvote: true;
    downvote: true;
  }
}

export interface AppTheme {
  dark: {
    palette: DeepPartial<Palette>
  },
  light: {
    palette: DeepPartial<Palette>
  },
}

export const color = {
  0: vercel,
  1: green,
  2: blue,
  3: red,
  4: _default,
}