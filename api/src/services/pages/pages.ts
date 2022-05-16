import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  PageResolvers,
} from 'types/graphql'

export const pages: QueryResolvers['pages'] = () => {
  return db.page.findMany()
}

export const page: QueryResolvers['page'] = ({ id }) => {
  return db.page.findUnique({
    where: { id },
  })
}

export const createPage: MutationResolvers['createPage'] = ({ input }) => {
  return db.page.create({
    data: input,
  })
}

export const updatePage: MutationResolvers['updatePage'] = ({ id, input }) => {
  return db.page.update({
    data: input,
    where: { id },
  })
}

export const deletePage: MutationResolvers['deletePage'] = ({ id }) => {
  return db.page.delete({
    where: { id },
  })
}

export const Page: PageResolvers = {
  createdBy: (_obj, { root }) =>
    db.page.findUnique({ where: { id: root.id } }).createdBy(),
  snippets: (_obj, { root }) =>
    db.page.findUnique({ where: { id: root.id } }).snippets(),
  joinedUsers: (_obj, { root }) =>
    db.page.findUnique({ where: { id: root.id } }).joinedUsers(),
}
