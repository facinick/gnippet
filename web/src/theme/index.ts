import { theme as green } from './green'
import { theme as blue } from './blue'
import { theme as _default } from './default'
import { theme as red } from './red'
import {  Palette, PaletteColor } from '@mui/material/styles';
// import { Palette } from '@mui/material/styles';
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
declare module "@mui/material/styles" {
  interface Palette {
    upvote?: PaletteColor;
    downvote?: PaletteColor;
    containerPrimary?: PaletteColor;
  }
  interface PaletteOptions {
    upvote?: PaletteColor;
    downvote?: PaletteColor;
    containerPrimary?: PaletteColor;
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
  0: _default,
  1: green,
  2: blue,
  3: red,
}