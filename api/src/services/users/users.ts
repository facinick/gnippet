import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  snippets: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).snippets(),
  votes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).votes(),
  comments: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).comments(),
  pages: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).pages(),
  savedSnippets: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).savedSnippets(),
  joinedPages: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).joinedPages(),
}
