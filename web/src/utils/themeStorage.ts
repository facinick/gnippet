import { Mode, Theme } from 'src/theme/ThemeProvider'
import Storage from './localStorageBase'

enum Locals {
  theme = 'theme',
  mode = 'mode',
}

type ThemeStorageKey = `${Locals}`

export default class ThemeStorage extends Storage<ThemeStorageKey> {
  private static instance?: ThemeStorage

  private constructor() {
    super()
  }

  public static getInstance(): ThemeStorage {
    if (!this.instance) {
      this.instance = new ThemeStorage()
    }

    return this.instance
  }

  public getTheme(): Theme | null {
    return Number(this.get(`${Locals.theme}`)) as Theme
  }

  public getMode(): Mode | null {
    return this.get(`${Locals.mode}`) as Mode
  }

  public setTheme(theme: number): void {
    return this.set(`${Locals.theme}`, theme.toString())
  }

  public setMode(mode: Mode): void {
    return this.set(`${Locals.mode}`, mode)
  }

  public hasTheme() {
    return this.get(`${Locals.theme}`) !== null
  }

  public hasMode() {
    return this.get(`${Locals.mode}`) !== null
  }
}
