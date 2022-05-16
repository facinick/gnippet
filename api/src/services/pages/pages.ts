import { ForbiddenError } from '@redwoodjs/graphql-server'
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  PageResolvers,
} from 'types/graphql'

// no auth restriction
// no access restriction
export const pages: QueryResolvers['pages'] = ({ input }) => {
  const where = input.filter
    ? {
      OR: [
        { name: { contains: input.filter } },
      ],
    }
    : {}
  return db.page.findMany({ where, skip: input.skip, take: input.take, orderBy: input.orderBy, })
}

// no auth restriction
// no access restriction
export const page: QueryResolvers['page'] = ({ id }) => {
  return db.page.findUnique({
    where: { id },
  })
}

// auth restriction
// no access restriction
export const createPage: MutationResolvers['createPage'] = ({ input }) => {
  requireAuth({})
  return db.page.create({
    data: input,
  })
}

// auth restriction
// access restriction: pageOwner
export const updatePage: MutationResolvers['updatePage'] = async ({ id, input }) => {
  requireAuth({})
  await requirePageOwnerAccess({id})
  return db.page.update({
    data: input,
    where: { id },
  })
}

// auth restriction
// access restriction: pageOwner
export const deletePage: MutationResolvers['deletePage'] = async ({ id }) => {
  requireAuth({})
  await requirePageOwnerAccess({id})
  return db.page.delete({
    where: { id },
  })
}

export const Page: PageResolvers = {
  // no auth restriction
  // no access restriction
  population: (_obj, { root }) =>
    db.page.count({ where: { id: root.id } }),
  // no auth restriction
  // no access restriction
  createdBy: (_obj, { root }) =>
    db.page.findUnique({ where: { id: root.id } }).createdBy(),
  // no auth restriction
  // no access restriction
  snippets: (_obj, { root }) =>
    db.page.findUnique({ where: { id: root.id } }).snippets(),
  // no auth restriction
  // no access restriction
  joinedUsers: (_obj, { root }) =>
    db.page.findUnique({ where: { id: root.id } }).joinedUsers(),
}

export const requirePageOwnerAccess = async ({id}: {id: typeof context.currentUser.id}) => {

  const userId: number = context.currentUser?.id;
  const page = await db.page.findUnique({
    where: {
      id,
    },
  });

  if(page.creatorId !== userId) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}