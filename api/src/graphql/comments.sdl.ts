export const schema = gql`
  type Comment {
    id: Int!
    body: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    authorId: Int!
    snippetId: Int!
    score: Int!
    # this could be either null (parent is snippet) or int (parent is another comment)
    parentCommentId: Int
    votes: [Vote]!
    author: User!
    snippet: Snippet!
    parent: Comment
    comments(input: CommentQueryFilterAndPagination): [Comment]!
    activity: Int!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  type CommentSubscriptionResponse {
    mutation: MutationType!
    node: Comment!
  }

  type SubscriptionPayload {
    data: CommentSubscriptionResponse
  }

  input CommentSubscriptionInput {
    snippetId: Int!
  }
  type Subscription {
    snippetComments(input: CommentSubscriptionInput!): SubscriptionPayload!
  }
  input CommentOrderByInput {
    createdAt: CommentSort
    updatedAt: CommentSort
    score: CommentSort
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
    ignoreChildComments: Boolean
  }

  type Query {
    # comments(input: CommentQueryFilterAndPagination): [Comment!]! @skipAuth
    comments(input: CommentQueryFilterAndPagination): [Comment!]! @skipAuth
    comment(id: Int!): Comment @skipAuth
  }

  input CreateCommentInput {
    body: String!
    authorId: Int!
    snippetId: Int!
    parentCommentId: Int
  }

  input VoteCommentInput {
    snippetId: Int!
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
  }
`
