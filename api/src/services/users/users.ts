import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'
import { isAuthenticated, requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

// Public Route
export const users: QueryResolvers['users'] = () => {
  return db.user.findMany({})
}

// Public Route
export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id }
  })
}

// Public Route
export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

// Private Route
export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  requireAuth({})
  requireOwnerAccess({id})
  return db.user.update({
    data: input,
    where: { id },
  })
}

// Private Route
export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  requireAuth({})
  requireOwnerAccess({id})
  return db.user.delete({
    where: { id },
  })
}

// Private Route
export const User: UserResolvers = {
  id: async (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return  (await db.user.findUnique({ where: { id: root.id } })).id
  },
  isBanned: async (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return  (await db.user.findUnique({ where: { id: root.id } })).isBanned
  },
  roles: async (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return  (await db.user.findUnique({ where: { id: root.id } })).roles
  },
  snippets: (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).snippets();
  },
  votes: (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).votes();
  },
  comments: (_obj, { root }) =>{
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).comments();
  },
  pages: (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).pages()
  },
  savedSnippets: (_obj, { root }) =>{
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).savedSnippets()
  },
  joinedPages: (_obj, { root }) =>{
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).joinedPages()
  }
}

export const requireOwnerAccess = ({id}: {id: typeof context.currentUser.id}) => {
  if(id !== context.currentUser.id) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}