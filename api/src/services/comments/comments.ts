import { ForbiddenError } from '@redwoodjs/graphql-server'
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { pubsub } from 'src/lib/pubsub'
import type {
  CommentResolvers,
  CommentSubscriptionResponseResolvers,
  MutationResolvers,
  QueryResolvers,
  SubscriptionPayload,
  SubscriptionResolvers,
} from 'types/graphql'

const SNIPPET_COMMENT_SUBSCRIPTION = 'SNIPPET_COMMENT_SUBSCRIPTION'

// no auth restriction
// no access restriction
export const comments: QueryResolvers['comments'] = ({ input }) => {
  const where = input?.filter
    ? {
        OR: [{ body: { contains: input?.filter } }],
      }
    : {}
  return db.comment.findMany({
    where,
    skip: input?.skip,
    take: input?.take,
    orderBy: input?.orderBy,
  })
}

// no auth restriction
// no access restriction
export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

// auth restriction
// no access restriction
export const createComment: MutationResolvers['createComment'] = async ({
  input,
}) => {
  requireAuth({})

  const comment = await db.comment.create({
    data: input,
  })

  pubsub.publish(SNIPPET_COMMENT_SUBSCRIPTION, {
    data: {
      mutation: 'CREATED',
      node: comment,
    },
  })

  return comment
}

// auth restriction
// access restriction: commentOwner
export const updateComment: MutationResolvers['updateComment'] = async ({
  id,
  input,
}) => {
  requireAuth({})
  await requireCommentOwner({ id })
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const incrementScore = async ({ id, value }) => {
  return db.comment.update({
    where: { id },
    data: { score: { increment: value } },
  })
}

export const decrementScore = async ({ id, value }) => {
  return db.comment.update({
    where: { id },
    data: { score: { decrement: value } },
  })
}

// auth restriction
// access restriction: commentOwner
export const deleteComment: MutationResolvers['deleteComment'] = async ({
  id,
}) => {
  requireAuth({})
  await requireCommentOwner({ id })
  return db.comment.delete({
    where: { id },
  })
}

export const subscriptionResolvers: SubscriptionResolvers = {
  snippetComments: {
    subscribe: () => ({
      // https://github.com/apollographql/apollo-server/issues/4556#issuecomment-1050691291
      [Symbol.asyncIterator]: () =>
        pubsub.asyncIterator([SNIPPET_COMMENT_SUBSCRIPTION]),
    }),
  },
}

export const Comment: CommentResolvers = {
  // no auth restriction
  // no access restriction
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { parentCommentId: root.id } }),
  // no auth restriction
  // no access restriction
  votes: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).votes(),
  // no auth restriction
  // no access restriction
  author: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).author(),
  // no auth restriction
  // no access restriction
  snippet: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).snippet(),

  comments: (_obj, { root }) => {
    const where = _obj.input?.filter
      ? {
          OR: [
            { title: { contains: _obj.input?.filter } },
            { body: { contains: _obj.input?.filter } },
          ],
        }
      : {}

    where['parentCommentId'] = _obj.input?.ignoreChildComments
      ? null
      : undefined

    return db.comment.findUnique({ where: { id: root.id } }).comments({
      where,
      orderBy: _obj.input?.orderBy,
      skip: _obj.input?.skip,
      take: _obj.input?.take,
    })
  },
}

export const requireCommentOwner = async ({ id }: { id: number }) => {
  const userId: number = context.currentUser?.id
  const comment = await db.snippet.findMany({
    where: {
      id,
      authorId: userId,
    },
  })

  if (!comment) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
