import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  VoteResolvers,
} from 'types/graphql'
import { downvoteComment, upvoteComment } from '../comments/comments'
import { downvoteSnippet, upvoteSnippet } from '../snippets/snippets'

// export const votes = () => {
//   return db.vote.findMany()
// }

export const vote: QueryResolvers['vote'] = ({ id }) => {
  return db.vote.findUnique({
    where: { id },
  })
}

// export const createVote: MutationResolvers['createVote'] = ({ input }) => {
//   return db.vote.create({
//     data: input,
//   })
// }

// export const updateVote: MutationResolvers['updateVote'] = ({ id, input }) => {
//   return db.vote.update({
//     data: input,
//     where: { id },
//   })
// }

// export const deleteVote: MutationResolvers['deleteVote'] = ({ id }) => {
//   return db.vote.delete({
//     where: { id },
//   })
// }

export const upvote = async ({ id, input }) => {
  requireAuth({})
  if(input.entityType === 'COMMENT') {
    return upvoteComment({
      id,
      input: {
        snippetId: input.snippetId
      }
    })
  } else {
    return upvoteSnippet({
      id,
    })
  }
}

export const downvote = async ({ id, input }) => {
  requireAuth({})
  if(input.entityType === 'COMMENT') {
    return downvoteComment({
      id,
      input: {
        snippetId: input.snippetId
      }
    })
  } else {
    return downvoteSnippet({
      id,
    })
  }
}

export const Vote: VoteResolvers = {
  user: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).user(),
  snippet: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).snippet(),
  comment: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).comment(),
}
