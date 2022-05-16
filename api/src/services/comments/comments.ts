import { ForbiddenError } from '@redwoodjs/graphql-server'
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  CommentResolvers,
} from 'types/graphql'

// no auth restriction
// no access restriction
export const comments: QueryResolvers['comments'] = () => {
  return db.comment.findMany()
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
export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  requireAuth({})
  return db.comment.create({
    data: input,
  })
}

// auth restriction
// access restriction: commentOwner
export const updateComment: MutationResolvers['updateComment'] = async ({
  id,
  input,
}) => {
  requireAuth({})
  await requireCommentOwner({id})
  return db.comment.update({
    data: input,
    where: { id },
  })
}

// auth restriction
// access restriction: commentOwner
export const deleteComment: MutationResolvers['deleteComment'] = async ({ id }) => {
  requireAuth({})
  await requireCommentOwner({id})
  return db.comment.delete({
    where: { id },
  })
}

// auth restriction
// no access restriction
export const upvoteComment = async ({ id }) => {
  requireAuth({})
  const userId: number = context.currentUser?.id;
  const commentId: number = id;

  const votes = await db.vote.findMany({
    where: {
      userId,
      commentId,
      entityType: 'COMMENT',
    },
  });

  const commentToVote = await db.comment.findUnique({
    where: {
      id
    },
  });

  // no such comment exists, ERROR
  if(!commentToVote) {
    throw new Error("No Such Comment Exists to Upvote")
  }

  const hasVoted = votes.find((vote) => vote.commentId === commentId);
  let newVote;

  // vote exists
  if(hasVoted) {

    // was upvoted
    // set comment score = score - 1
    // delete vote
    if(hasVoted.type === 'UPVOTE') {
      newVote = await db.comment.update({
        where: {
          id: commentId
        },
        data: {
          score: {
            decrement: 1
          },
          votes: {
            delete: {
              id: hasVoted.id
            }
          }
        },
      })
    }

    // was downvoted
    // set comment score = score + 2
    // change vote type
    else {
      newVote = await db.comment.update({
        where: {
          id: commentId
        },
        data: {
          score: {
            increment: 2
          },
          votes: {
            update: {
              where: {
                id: hasVoted.id
              },
              data: {
                type: 'UPVOTE'
              }
            }
          }
        },
      })
    }
  }

  // was not voted
  // set comment score = score + 1
  // set vote type and entity type
  else {
    newVote = await db.comment.update({
      where: {
        id: commentId
      },
      data: {
        score: {
          increment: 1
        },
        votes: {
          // it's comment id should be set and comment id should be not set
          create: {
            type: 'UPVOTE',
            userId: userId,
            entityType: 'COMMENT',
          }
        }
      },
    })
  }

  return newVote;
}

// auth restriction
// no access restriction
export const downvoteComment = async ({ id }) => {
  requireAuth({})
  const userId: number = context.currentUser?.id;
  const commentId: number = id;

  const votes = await db.vote.findMany({
    where: {
      userId,
      commentId,
      entityType: 'COMMENT',
    },
  });

  const commentToVote = await db.comment.findUnique({
    where: {
      id
    },
  });

  // no such comment exists, ERROR
  if(!commentToVote) {
    throw new Error("No Such Comment Exists to Upvote")
  }

  const hasVoted = votes.find((vote) => vote.commentId === commentId);
  let newVote;

  // vote exists
  if(hasVoted) {

    // was downvoted
    // set comment score = score + 1
    // delete vote
    if(hasVoted.type === 'DOWNVOTE') {
      newVote = await db.comment.update({
        where: {
          id: commentId
        },
        data: {
          score: {
            increment: 1
          },
          votes: {
            delete: {
              id: hasVoted.id
            }
          }
        },
      })
    }

    // was upvoted
    // set comment score = score - 2
    // change vote type
    else {
      newVote = await db.comment.update({
        where: {
          id: commentId
        },
        data: {
          score: {
            decrement: 2
          },
          votes: {
            update: {
              where: {
                id: hasVoted.id
              },
              data: {
                type: 'DOWNVOTE'
              }
            }
          }
        },
      })
    }
  }

  // was not voted
  // set comment score = score - 1
  // set vote type and entity type
  else {
    newVote = await db.comment.update({
      where: {
        id: commentId
      },
      data: {
        score: {
          decrement: 1
        },
        votes: {
          // it's comment id should be set and comment id should be not set
          create: {
            type: 'DOWNVOTE',
            userId: userId,
            entityType: 'COMMENT',
          }
        }
      },
    })
  }
}

export const Comment: CommentResolvers = {
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
}

export const requireCommentOwner = async ({id}: {id: number}) => {
  const userId: number = context.currentUser?.id;
  const comment = await db.snippet.findMany({
    where: {
      id,
      authorId: userId,
    },
  });

  if(!comment) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}