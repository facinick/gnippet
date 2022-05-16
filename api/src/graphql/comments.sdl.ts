export const schema = gql`
  type Comment {
    id: Int!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    authorId: Int!
    snippetId: Int!
    parentCommentId: Int
    votes: [Vote]!
    author: User!
    snippet: Snippet!
    parent: Comment
    children: [Comment]!
  }

  input CommentOrderByInput {
    createdAt: CommentSort
    updatedAt: CommentSort
  }

  enum CommentSort {
    asc
    desc
  }

  enum ParentEntityType {
    comment
    post
  }
  input CommentQueryFilterAndPagination {
    filter: String
    skip: Int
    take: Int
    orderBy: CommentOrderByInput
  }

  type Query {
    comments(input: CommentQueryFilterAndPagination): [Comment!]! @skipAuth
    comment(id: Int!): Comment @skipAuth
  }

  input CreateCommentInput {
    body: String!
    authorId: Int!
    snippetId: Int!
    parentCommentId: Int
  }

  input UpdateCommentInput {
    body: String
    authorId: Int
    snippetId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
    upvoteComment(id: Int!): Comment! @requireAuth
    downvoteComment(id: Int!): Comment! @requireAuth
  }
`
