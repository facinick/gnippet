import { ServerError } from 'src/error/ServerError';
import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  SnippetResolvers,
  SnippetOrderByInput,
} from 'types/graphql'


const getPrismaOrderByForSnippetsQuery = (orderBy: SnippetOrderByInput) => {
  let orderByObject

  if (orderBy === 'new') {
    orderByObject = { createdAt: 'desc' }
  }

  if (orderBy === 'activity') {
    orderByObject = [
      {
        comments: {
          _count: 'desc',
        },
      },
    ]
  }

  if (orderBy === 'score') {
    orderByObject = { score: 'desc' }
  }

  return orderByObject
}

export const increaseViewCount = async ({ id, input }) => {

  const { fingerprintId } = input

  const visited = await db.visitor.findMany({
    where: {
      fingerprintId,
      snippetId: id,
    }
  })

  // user did visit, return
  if (visited.length > 0) {
    return null
  }

  // user is new apparently, inc viewCount and return
  else {
    await db.snippet.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
        visitors: {
          create: {
            fingerprintId
          }
        }
      },
    })

    return null
  }
}

export const snippets: QueryResolvers['snippets'] = async ({ input }) => {

  const orderBy = getPrismaOrderByForSnippetsQuery(input.orderBy)

  const where = input?.filter
    ? {
      OR: [
        { title: { contains: input?.filter } },
        { body: { contains: input?.filter } },
      ],
    }
    : {}

  const count = await db.snippet.count()

  const data = await db.snippet.findMany({ where, skip: input?.skip, take: input?.take, orderBy, include: { tags: true }})
  return {
    count,
    data
  }
}

export const snippet: QueryResolvers['snippet'] = ({ id }) => {
  return db.snippet.findUnique({
    where: { id },
    include: { tags: true }
  })
}

export const createSnippet: MutationResolvers['createSnippet'] = async ({
  input,
}) => {
  requireAuth({})

  const { tags } = input
  const tagsToConnect = tags.filter((tag) => tag.id != undefined).map( ({id, ...rest})  => { return { id } })
  const tagsToCreate = tags.filter((tag) => tag.id == undefined)

  return db.snippet.create({
    data: {
      ...input,
      tags: {
        connect: [
          ...tagsToConnect
        ],
        create: [
          ...tagsToCreate
        ]
      }
    },
    include: {
      tags: true
    }
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