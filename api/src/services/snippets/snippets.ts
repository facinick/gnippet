import { ServerError } from 'src/error/ServerError';
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  SnippetResolvers,
  MutationsaveSnippetArgs,
  MutationunsaveSnippetArgs,
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
  //@ts-ignore
  return db.snippet.findMany({ where, skip: input?.skip, take: input?.take, orderBy})
}

export const snippet: QueryResolvers['snippet'] = ({ id }) => {
  return db.snippet.findUnique({
    where: { id },
  })
}

export const createSnippet: MutationResolvers['createSnippet'] = async ({
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

export const saveSnippet = async ({ id }: MutationsaveSnippetArgs) => {
  requireAuth({})
  const userId: number = context.currentUser?.id;

  const snippetToSave = await snippet({ id })

  if(!snippetToSave) {
    throw new ServerError({
      message: "Can't save snippet that doesn't exist"
    })
  }

  await db.user.update({
    where: {
      id: userId
    },
    data: {
      savedSnippets: {
        connect: {
          id
        }
      }
    }
  });

  return snippetToSave;
}

export const unsaveSnippet = async ({ id }: MutationunsaveSnippetArgs) => {
  requireAuth({})
  const userId: number = context.currentUser?.id;

  const snippetToUnSave = await snippet({ id })

  if(!snippetToUnSave) {
    throw new ServerError({
      message: "Can't Unsave snippet that doesn't exist"
    })
  }

  await db.user.update({
    where: {
      id: userId
    },
    data: {
      savedSnippets: {
        disconnect: {
          id
        }
      }
    }
  });

  return snippetToUnSave;
}

export const incrementScore = async ({ id, value }) => {
  return db.snippet.update({ where: { id }, data: { score: { increment: value }}})
}

export const decrementScore = async ({ id, value }) => {
  return db.snippet.update({ where: { id }, data: { score: { decrement: value }}})
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