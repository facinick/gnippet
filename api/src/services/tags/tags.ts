import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  MutationResolvers, QueryResolvers, TagResolvers
} from 'types/graphql'

export const tags: QueryResolvers['tags'] = async({ input }) => {

  const where = input?.filter
    ? {
      OR: [
        { name: { contains: input?.filter } },
      ],
    }
    : {}

  const tags = await db.tag.findMany({ where, skip: input?.skip, take: input?.take, orderBy: input?.orderBy }) || []
  return tags
}

// export const tag: QueryResolvers['tag'] = ({ id }) => {
//   return db.tag.findUnique({
//     where: { id },
//   })
// }

export const createTag: MutationResolvers['createTag'] = ({ input }) => {
  requireAuth({})
  return db.tag.create({
    data: input,
  })
}

// export const updateTag: MutationResolvers['updateTag'] = ({ id, input }) => {
//   requireAuth({})
//   return db.tag.update({
//     data: input,
//     where: { id },
//   })
// }

export const deleteTag: MutationResolvers['deleteTag'] = ({ id }) => {
  requireAuth({})
  return db.tag.delete({
    where: { id },
  })
}


export const tagByName = ({ name }) => {
  return db.tag.findUnique({
    where: { name },
  })
}

export const Tag: TagResolvers = {
  snippets: async (_obj, { root }) => {

    const take = _obj.input?.take
    const name = root.name
    const nextCursor = _obj.input?.nextCursor
    const skip = nextCursor === null ? 0 : 1


    console.log(
      `asking for: ${take} snippets, starting from ${nextCursor} skipping ${skip}`
    )

    // const snippetsByTag = await db.snippet.findMany({
    //   take,
    //   cursor: nextCursor === null ? undefined : {
    //     id: nextCursor
    //   },
    //   skip,
    //   where: {
    //     tags: {
    //       some: {
    //         name,
    //       },
    //     },
    //   },
    //   include: {
    //     tags: true,
    //     comments: true,
    //     author: true,
    //   },
    // })

    const snippetsByTag = (await db.tag.findUnique({
      where: {
        name,
      },
      include: {
        snippets: {
          take,
          cursor:
            nextCursor === null
              ? undefined
              : {
                  id: nextCursor,
                },
          skip,
          include: {
            tags: true,
            comments: true,
            author: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    })).snippets

    // all the snippets in db
    const count = await db.snippet.count()

    // results we could find... [0 - take]
    const nResults = snippetsByTag.length

    const lastResult = nResults >= 1 ? snippetsByTag[nResults - 1] : null

    const myCursor = lastResult ? lastResult.id : nextCursor

    console.log(`nextCursor: ${myCursor} nResults: ${nResults}`)

    const response = {
      nextCursor: myCursor,
      count,
      data: snippetsByTag,
    }

    return response
  }
}

// export const requireTagCreatorAccess = async ({id}: {id: typeof context.currentUser.id}) => {

//   const userId: number = context.currentUser?.id;
//   const tag = await db.tag.findUnique({
//     where: {
//       id,
//     },
//   });

//   if(tag. !== userId) {
//     throw new ForbiddenError("You don't have access to do that.")
//   }
// }