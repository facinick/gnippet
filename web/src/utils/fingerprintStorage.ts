import Storage from './localStorageBase'

enum Locals {
  USER_FINGERPRINT = 'USER_FINGERPRINT',
}

type FingerprintKey = `${Locals}_${string}`

export default class FingerprintStorage extends Storage<FingerprintKey> {
  private static instance?: FingerprintStorage

  private constructor() {
    super()
  }

  public static getInstance(): FingerprintStorage {
    if (!this.instance) {
      this.instance = new FingerprintStorage()
    }

    return this.instance
  }

  public getFingerprintBySnippetId(id: string): string | null {
    return this.get(`${Locals.USER_FINGERPRINT}_${id}`)
  }

  public setFingerprintWithId(id: string, fingerprint: string): void {
    this.set(`${Locals.USER_FINGERPRINT}_${id}`, fingerprint)
  }

  public hasFingerprintWithId(id: string) {
    return this.get(`${Locals.USER_FINGERPRINT}_${id}`) !== null
  }
}
