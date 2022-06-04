import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      data.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({
          username: 'facinick',
          password: '092abf53d3167cb4edad712972c74c77d57da091168e51161695d3736861d05c',
          salt: '61a1896e95206600bab32578a0c3d689'
        })
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
