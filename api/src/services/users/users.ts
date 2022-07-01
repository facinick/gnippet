import { ForbiddenError } from '@redwoodjs/graphql-server'
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  MutationResolvers, QueryResolvers, UserResolvers
} from 'types/graphql'

// Public Route
export const users: QueryResolvers['users'] = ({ input }) => {
  const where = input?.filter
    ? {
      OR: [
        { username: { contains: input?.filter } },
      ],
    }
    : {}

  return db.user.findMany({ where, skip: input?.skip, take: input?.take, orderBy: input?.orderBy })
}

// Public Route
export const userByUsername = ({ username }: {username: string}) => {
  return db.user.findUnique({
    where: { username }
  })
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
    // requireOwnerAccess({id: root.id})
    return  (await db.user.findUnique({ where: { id: root.id } })).id
  },
  isBanned: async (_obj, { root }) => {
    requireAuth({})
    // requireOwnerAccess({id: root.id})
    return  (await db.user.findUnique({ where: { id: root.id } })).isBanned
  },
  roles: async (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return  (await db.user.findUnique({ where: { id: root.id } })).roles
  },
  snippets: (_obj, { root }) => {
    const where = _obj.input?.filter
    ? {
      OR: [
        { title: { contains: _obj.input?.filter } },
        { body: { contains: _obj.input?.filter } },
      ],
    }
    : {}

    return db.user.findUnique({ where: { id: root.id } }).snippets({ where, orderBy: _obj.input?.orderBy, skip: _obj.input?.skip, take: _obj.input?.take })
  },
  votes: (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).votes();
  },
  bookmarks: (_obj, { root }) => {
    requireAuth({})
    requireOwnerAccess({id: root.id})
    return db.user.findUnique({ where: { id: root.id } }).bookmarks();
  },
  comments: (_obj, { root }) =>{
    // requireAuth({})
    // requireOwnerAccess({id: root.id})
    const where = _obj.input?.filter
    ? {
      OR: [
        { title: { contains: _obj.input?.filter } },
        { body: { contains: _obj.input?.filter } },
      ],
    }
    : {}

    return db.user.findUnique({ where: { id: root.id } }).comments({ where, orderBy: _obj.input?.orderBy, skip: _obj.input?.skip, take: _obj.input?.take })
  },
  pages: (_obj, { root }) => {
    // requireAuth({})
    // requireOwnerAccess({id: root.id})
    const where = _obj.input?.filter
    ? {
      OR: [
        { name: { contains: _obj.input?.filter } },
      ],
    }
    : {}

    return db.user.findUnique({ where: { id: root.id } }).pages({ where, orderBy: _obj.input?.orderBy, skip: _obj.input?.skip, take: _obj.input?.take })
  },
  joinedPages: (_obj, { root }) =>{
    requireAuth({})
    requireOwnerAccess({id: root.id})

    const where = _obj.input?.filter
    ? {
      OR: [
        { name: { contains: _obj.input?.filter } },
      ],
    }
    : {}

    return db.user.findUnique({ where: { id: root.id } }).joinedPages({ where, orderBy: _obj.input?.orderBy, skip: _obj.input?.skip, take: _obj.input?.take })
  }
}

export const requireOwnerAccess = ({id}: {id: typeof context.currentUser.id}) => {
  if(id !== context.currentUser.id) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}