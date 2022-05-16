export const schema = gql`
  type Snippet {
    id: Int!
    title: String!
    body: String!
    score: Int!
    authorId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    pageId: Int!
    savedBy: [User]!
    author: User!
    languages: [Language]!
    tags: [Tag]!
    comments: [Comment]!
    votes: [Vote]!
    page: Page!
  }

  type Query {
    snippets: [Snippet!]! @requireAuth
    snippet(id: Int!): Snippet @requireAuth
  }

  input CreateSnippetInput {
    title: String!
    body: String!
    score: Int!
    authorId: Int!
    pageId: Int!
  }

  input UpdateSnippetInput {
    title: String
    body: String
    score: Int
    authorId: Int
    pageId: Int
  }

  type Mutation {
    createSnippet(input: CreateSnippetInput!): Snippet! @requireAuth
    updateSnippet(id: Int!, input: UpdateSnippetInput!): Snippet! @requireAuth
    deleteSnippet(id: Int!): Snippet! @requireAuth
    upvoteSnippet(id: Int!): Snippet! @requireAuth
    downvoteSnippet(id: Int!): Snippet! @requireAuth
  }
`
