import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  VoteResolvers,
} from 'types/graphql'

export const votes: QueryResolvers['votes'] = () => {
  return db.vote.findMany()
}

export const vote: QueryResolvers['vote'] = ({ id }) => {
  return db.vote.findUnique({
    where: { id },
  })
}

export const createVote: MutationResolvers['createVote'] = ({ input }) => {
  return db.vote.create({
    data: input,
  })
}

export const updateVote: MutationResolvers['updateVote'] = ({ id, input }) => {
  return db.vote.update({
    data: input,
    where: { id },
  })
}

export const deleteVote: MutationResolvers['deleteVote'] = ({ id }) => {
  return db.vote.delete({
    where: { id },
  })
}

export const Vote: VoteResolvers = {
  user: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).user(),
  snippet: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).snippet(),
  comment: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).comment(),
}
