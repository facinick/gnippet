import { makeVar } from '@apollo/client'

export type parentCommentId = number

const field: parentCommentId = -1

export const replyToCommentIdVar = makeVar<parentCommentId>(field)

export const setReplyToParentCommentId = ({ field }: { field: parentCommentId }) =>
  replyToCommentIdVar(field)

export const closeReplyForm = () => replyToCommentIdVar(-1)
