import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  SnippetResolvers,
} from 'types/graphql'

export const snippets: QueryResolvers['snippets'] = ({ input }) => {

  let orderByActivity: false | string = false;

  // is a custom aggregation field
  if(input.orderBy.activity) {
    orderByActivity = input.orderBy.activity;
    delete input.orderBy['activity']
  }

  const orderBy = orderByActivity
    ? [{
        comments: {
          _count: orderByActivity
        }
      }]
      :
      [input.orderBy]

  const where = input?.filter
    ? {
      OR: [
        { title: { contains: input?.filter } },
        { body: { contains: input?.filter } },
      ],
    }
    : {}
  return db.snippet.findMany({ where, skip: input?.skip, take: input?.take, orderBy})
}

export const snippet: QueryResolvers['snippet'] = ({ id }) => {
  return db.snippet.findUnique({
    where: { id },
  })
}

export const createSnippet: MutationResolvers['createSnippet'] = ({
  input,
}) => {
  requireAuth({})
  return db.snippet.create({
    data: input,
  })
}

export const updateSnippet: MutationResolvers['updateSnippet'] = ({
  id,
  input,
}) => {
  requireAuth({})
  requireSnippetOwner({id});
  return db.snippet.update({
    data: input,
    where: { id },
  })
}

export const deleteSnippet: MutationResolvers['deleteSnippet'] = ({ id }) => {
  requireAuth({})
  requireSnippetOwner({id});
  return db.snippet.delete({
    where: { id },
  })
}

export const upvoteSnippet = async ({ id }) => {
  requireAuth({})
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

export const downvoteSnippet = async ({ id }) => {
  requireAuth({})
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

export const saveSnippet = async ({ id }) => {
  requireAuth({})
  const userId: number = context.currentUser?.id;
  const snippetId: number = id;

  const snippetToSave = await db.snippet.findUnique({
    where: {
      id: snippetId
    }
  })

  if(!snippetToSave) {
    throw new Error("Can't save snippet that doesn't exist")
  }

  await db.user.update({
    where: {
      id: userId
    },
    data: {
      savedSnippets: {
        connect: {
          id: snippetId
        }
      }
    }
  });

  return snippetToSave;
}

export const unsaveSnippet = async ({ id }) => {
  requireAuth({})
  const userId: number = context.currentUser?.id;
  const snippetId: number = id;

  const snippetToSave = await db.snippet.findUnique({
    where: {
      id: snippetId
    }
  })

  if(!snippetToSave) {
    throw new Error("Can't un save snippet that doesn't exist")
  }

  await db.user.update({
    where: {
      id: userId
    },
    data: {
      savedSnippets: {
        disconnect: {
          id: snippetId
        }
      }
    }
  });

  return snippetToSave;
}

export const Snippet: SnippetResolvers = {
  // savedBy: (_obj, { root }) =>
  //   db.snippet.findUnique({ where: { id: root.id } }).savedBy(),
  author: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).author(),
  activity: async (_obj, { root }) =>
    db.comment.count({ where: { snippetId: root.id }}),
  languages: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).languages(),
  tags: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).tags(),
  comments: (_obj, { root }) => {

    const where = _obj.input?.filter
    ? {
      OR: [
        { title: { contains: _obj.input?.filter } },
        { body: { contains: _obj.input?.filter } },
      ],
    }
    : {}

    where['parentCommentId'] = _obj.input?.ignoreChildComments ? null : undefined

    return db.snippet.findUnique({ where: { id: root.id } }).comments({ where, orderBy: _obj.input?.orderBy, skip: _obj.input?.skip, take: _obj.input?.take })
  },
  votes: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).votes(),
  page: (_obj, { root }) =>
    db.snippet.findUnique({ where: { id: root.id } }).page(),
}

export const requireSnippetOwner = async ({id}: {id: number}): Promise<boolean> => {
  const userId: number = context.currentUser?.id;
  const snippet = await db.snippet.findMany({
    where: {
      id,
      authorId: userId,
    },
  });

  if(snippet) {
    return true;
  } else {
    return false;
  }
}