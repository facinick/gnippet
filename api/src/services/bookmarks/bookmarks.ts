import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import type {
  BookmarkResolvers, MutationResolvers
} from 'types/graphql'

export const bookmarks = ({ input }) => {
  const { userId } = input
  return db.bookmark.findMany({
    where: {
      userId,
    },
  })
}

export const createBookmark: MutationResolvers['createBookmark'] = ({
  input,
}) => {
  return db.bookmark.create({
    data: input,
  })
}

export const deleteBookmark: MutationResolvers['deleteBookmark'] = ({ id }) => {
  requireAuth({})
  requireBookmarkOwner({id});
  return db.bookmark.delete({
    where: { id },
  })
}

export const Bookmark: BookmarkResolvers = {
  user: (_obj, { root }) =>
    db.bookmark.findUnique({ where: { id: root.id } }).user(),
  snippet: (_obj, { root }) =>
    db.bookmark.findUnique({ where: { id: root.id } }).snippet(),
  comment: (_obj, { root }) =>
    db.bookmark.findUnique({ where: { id: root.id } }).comment(),
}

export const requireBookmarkOwner = async ({id}: {id: number}): Promise<boolean> => {
  const userId: number = context.currentUser?.id;
  const bookmark = await db.bookmark.findMany({
    where: {
      id,
      userId: userId,
    },
  });

  if(bookmark) {
    return true;
  } else {
    return false;
  }
}