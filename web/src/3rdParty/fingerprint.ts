import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const generateAndGetFingerprint = async () => {
  const result = await(await FingerprintJS.load({ monitoring: false })).get()
  return result.visitorId
}

export const generateAndGetIDedFingerprint = async (id: string) => {
  const result = await(generateAndGetFingerprint())
  return `${result}_${id}`
}