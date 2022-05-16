import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TagResolvers,
} from 'types/graphql'

export const tags: QueryResolvers['tags'] = () => {
  return db.tag.findMany()
}

export const tag: QueryResolvers['tag'] = ({ id }) => {
  return db.tag.findUnique({
    where: { id },
  })
}

export const createTag: MutationResolvers['createTag'] = ({ input }) => {
  requireAuth({})
  return db.tag.create({
    data: input,
  })
}

export const updateTag: MutationResolvers['updateTag'] = ({ id, input }) => {
  requireAuth({})
  return db.tag.update({
    data: input,
    where: { id },
  })
}

export const deleteTag: MutationResolvers['deleteTag'] = ({ id }) => {
  requireAuth({})
  return db.tag.delete({
    where: { id },
  })
}

export const Tag: TagResolvers = {
  snippets: (_obj, { root }) =>
    db.tag.findUnique({ where: { id: root.id } }).snippets(),
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