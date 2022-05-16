export const schema = gql`
  type Comment {
    id: Int!
    body: String!
    authorId: Int!
    snippetId: Int!
    votes: [Vote]!
    author: User!
    snippet: Snippet!
  }

  type Query {
    comments: [Comment!]! @skipAuth
    comment(id: Int!): Comment @skipAuth
  }

  input CreateCommentInput {
    body: String!
    authorId: Int!
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
    upvoteComment(id: Int!): Comment! @requireAuth
    downvoteComment(id: Int!): Comment! @requireAuth
  }
`
