import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  SnippetResolvers,
} from 'types/graphql'

export const snippets: QueryResolvers['snippets'] = () => {
  return db.snippet.findMany()
}

export const snippet: QueryResolvers['snippet'] = ({ id }) => {
  return db.snippet.findUnique({
    where: { id },
  })
}

export const createSnippet: MutationResolvers['createSnippet'] = ({
  input,
}) => {
  return db.snippet.create({
    data: input,
  })
}

export const updateSnippet: MutationResolvers['updateSnippet'] = ({
  id,
  input,
}) => {
  return db.snippet.update({
    data: input,
    where: { id },
  })
}

export const deleteSnippet: MutationResolvers['deleteSnippet'] = ({ id }) => {
  return db.snippet.delete({
    where: { id },
  })
}

export const upvote = async ({ id }) => {

  const userId: number = context.currentUser?.id;
  const snippetId: number = id;

  const votes = await db.vote.findMany({
    where: {
      userId,
      snippetId,
      entityType: 'SNIPPET',
    },
  });

  const snippet = await db.snippet.findUnique({
    where: {
      id
    },
  });

  // no such snippet exists, ERROR
  if(!snippet) {
    throw new Error("No Such Snippet Exists to Upvote")
  }

  const hasVoted = votes.find((vote) => vote.snippetId === snippetId);
  let newVote;

  // vote exists
  if(hasVoted) {

    // was upvoted
    // set snippet score = score - 1
    // delete vote
    if(hasVoted.type === 'UPVOTE') {
      newVote = await db.snippet.update({
        where: {
          id: snippetId
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
    // set snippet score = score + 2
    // change vote type
    else {
      newVote = await db.snippet.update({
        where: {
          id: snippetId
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
  // set snippet score = score + 1
  // set vote type and entity type
  else {
    newVote = await db.snippet.update({
      where: {
        id: snippetId
      },
      data: {
        score: {
          increment: 1
        },
        votes: {
          // it's snippet id should be set and comment id should be not set
          create: {
            type: 'UPVOTE',
            userId: userId,
            entityType: 'SNIPPET',
          }
        }
      },
    })
  }

  return newVote;
}

export const downvote = async ({ id }) => {

  const userId: number = context.currentUser?.id;
  const snippetId: number = id;

  const votes = await db.vote.findMany({
    where: {
      userId,
      snippetId,
      entityType: 'SNIPPET',
    },
  });

  const snippet = await db.snippet.findUnique({
    where: {
      id
    },
  });

  // no such snippet exists, ERROR
  if(!snippet) {
    throw new Error("No Such Snippet Exists to Upvote")
  }

  const hasVoted = votes.find((vote) => vote.snippetId === snippetId);
  let newVote;

  // vote exists
  if(hasVoted) {

    // was downvoted
    // set snippet score = score + 1
    // delete vote
    if(hasVoted.type === 'DOWNVOTE') {
      newVote = await db.snippet.update({
        where: {
          id: snippetId
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
    // set snippet score = score - 2
    // change vote type
    else {
      newVote = await db.snippet.update({
        where: {
          id: snippetId
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
  // set snippet score = score - 1
  // set vote type and entity type
  else {
    newVote = await db.snippet.update({
      where: {
        id: snippetId
      },
      data: {
        score: {
          decrement: 1
        },
        votes: {
          // it's snippet id should be set and comment id should be not set
          create: {
            type: 'DOWNVOTE',
            userId: userId,
            entityType: 'SNIPPET',
          }
        }
      },
    })
  }
}

export const Snippet: SnippetResolvers = {
  savedBy: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).savedBy(),
  author: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).author(),
  languages: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).languages(),
  tags: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).tags(),
  comments: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).comments(),
  votes: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).votes(),
  page: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).page(),
}
