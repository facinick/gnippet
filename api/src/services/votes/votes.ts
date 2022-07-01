import { ServerError } from 'src/error/ServerError'
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  CUDAction, MutationcreateVoteArgs,
  MutationdeleteVoteArgs, MutationupdateVoteArgs, MutationupvoteArgs, VoteResolvers
} from 'types/graphql'

export const votes = ({ input }) => {
  const { userId } = input
  return db.vote.findMany({
    where: {
      userId,
    },
  })
}

export const vote = ({ id }) => {
  return db.vote.findUnique({
    where: { id },
  })
}

export const createVote = ({ input }: MutationcreateVoteArgs) => {
  return db.vote.create({
    data: input,
  })
}

export const updateVote = ({ id, input }: MutationupdateVoteArgs) => {
  return db.vote.update({
    data: input,
    where: { id },
  })
}

export const deleteVote = ({ id }: MutationdeleteVoteArgs) => {
  return db.vote.delete({
    where: { id },
  })
}

export const upvote = async ({ input }: MutationupvoteArgs) => {

  requireAuth({})

  const { snippetId, commentId, entityType } = input

  const userId: number = context.currentUser?.id

  let cudAction: CUDAction

  // check if vote already exists
  // (at max only one can exist,
  // that's why we are getting first one)
  const vote = await db.vote.findFirst({
    where: {
      snippetId,
      commentId,
      entityType,
      userId,
    },
  })

  let upsertedVote
  let updatedEntity

  // a vote exists,
  // user is trying to [cancel an upvote] -1
  // or [reverse a downvote] +2
  if (vote) {
    switch (vote.value) {
      case 1:
        // existing vote is an upvote,
        // delete this vote from the database
        upsertedVote = db.vote.delete({ where: { id: vote.id } })
        cudAction = 'DELETED'
        // upvote has been removed, decrease score by 1
        updatedEntity =
          entityType === 'COMMENT'
            ? db.comment.update({
                where: { id: commentId },
                data: { score: { decrement: 1 } },
              })
            : db.snippet.update({
                where: { id: snippetId },
                data: { score: { decrement: 1 } },
              })

        break
      case -1:
        // existing vote is a downvote,
        // edit this vote in the database -1 to 1
        upsertedVote = db.vote.update({
          where: { id: vote.id },
          data: { value: 1 },
        })
        cudAction = 'UPDATED'
        // downvote has been converted into an upvote, increase score by 2
        updatedEntity =
          entityType === 'COMMENT'
            ? db.comment.update({
                where: { id: commentId },
                data: { score: { increment: 2 } },
              })
            : db.snippet.update({
                where: { id: snippetId },
                data: { score: { increment: 2 } },
              })

        break
      default:
        throw new ServerError({
          message: `A vote in db exists that doesn't have a type, couldn't proceed with upvote!`,
        })
    }
  }

  // vote doesn't exists,
  // user is trying to [upvote for first time]
  else {
    // create new vote with value 1
    upsertedVote = db.vote.create({
      data: { value: 1, entityType, userId, snippetId, commentId },
    })
    cudAction = 'CREATED'
    // increase score by 1
    updatedEntity =
      entityType === 'COMMENT'
        ? db.comment.update({
            where: { id: commentId },
            data: { score: { increment: 1 } },
          })
        : db.snippet.update({
            where: { id: snippetId },
            data: { score: { increment: 1 } },
          })
  }

  const [responseVote, responseEntity] = await db.$transaction([
    upsertedVote,
    updatedEntity,
  ])

  const response = {
    vote: responseVote,
    cudAction,
    score: responseEntity.score,
  }

  return response
}

export const downvote = async ({ input }: MutationupvoteArgs) => {
  requireAuth({})

  const { snippetId, commentId, entityType } = input

  const userId: number = context.currentUser?.id

  let cudAction: CUDAction

  // check if vote already exists
  // (at max only one can exist,
  // that's why we are getting first one)
  const vote = await db.vote.findFirst({
    where: {
      snippetId,
      commentId,
      entityType,
      userId,
    },
  })

  let upsertedVote
  let updatedEntity

  // an vote exists,
  // user is trying to [cancel an upvote]
  // or [reverse a downvote]
  if (vote) {
    switch (vote.value) {
      case -1:
        // existing vote is a downvote,
        // delete this vote from the database (+1)
        upsertedVote = db.vote.delete({ where: { id: vote.id } })
        cudAction = 'DELETED'
        // downvote was deleted, increment score by 1
        updatedEntity =
          entityType === 'COMMENT'
            ? db.comment.update({
                where: { id: commentId },
                data: { score: { increment: 1 } },
              })
            : db.snippet.update({
                where: { id: snippetId },
                data: { score: { increment: 1 } },
              })

        break
      case 1:
        // existing vote is an upvote,
        // edit this vote in the database, 1 => -1
        upsertedVote = db.vote.update({
          where: { id: vote.id },
          data: { value: -1 },
        })
        cudAction = 'UPDATED'
        // upvote has been converted into downvote, decrement score by 2
        updatedEntity =
          entityType === 'COMMENT'
            ? db.comment.update({
                where: { id: commentId },
                data: { score: { decrement: 2 } },
              })
            : db.snippet.update({
                where: { id: snippetId },
                data: { score: { decrement: 2 } },
              })

        break
      default:
        throw new ServerError({
          message: `A vote in db exists that doesn't have a type, couldn't proceed with upvote!`,
        })
    }
  }

  // vote doesn't exists,
  // user is trying to [downvote for first time]
  else {
    // create a new vote with value -1
    upsertedVote = db.vote.create({
      data: { value: -1, entityType, userId, snippetId, commentId },
    })
    cudAction = 'CREATED'
    // decrement score by 1
    updatedEntity =
      entityType === 'COMMENT'
        ? db.comment.update({
            where: { id: commentId },
            data: { score: { decrement: 1 } },
          })
        : db.snippet.update({
            where: { id: snippetId },
            data: { score: { decrement: 1 } },
          })
  }

  const [responseVote, responseEntity] = await db.$transaction([
    upsertedVote,
    updatedEntity,
  ])

  const response = {
    vote: responseVote,
    cudAction,
    score: responseEntity.score,
  }

  return response
}

export const Vote: VoteResolvers = {
  user: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).user(),
  snippet: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).snippet(),
  comment: (_obj, { root }) =>
    db.vote.findUnique({ where: { id: root.id } }).comment(),
}
