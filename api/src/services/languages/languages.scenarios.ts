import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LanguageCreateArgs>({
  language: {
    one: { data: { name: 'String', updatedAt: '2022-05-16T12:00:39Z' } },
    two: { data: { name: 'String', updatedAt: '2022-05-16T12:00:39Z' } },
  },
})

export type StandardScenario = typeof standard
