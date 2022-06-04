export const schema = gql`
  type Snippet {
    id: Int!
    title: String!
    body: String!
    authorId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    imageUrl: String
    pageId: Int
    # savedBy: [User]!
    author: User!
    languages: [Language]!
    tags: [Tag]!
    comments(input: CommentQueryFilterAndPagination): [Comment]!
    votes: [Vote]!
    page: Page
    # sum of votes
    score: Int!
    # number of comments
    activity: Int!
  }

  enum SnippetOrderByInput {
    new
    activity
    score
  }

  enum SnippetSort {
    asc
    desc
  }

  input SnippetQueryFilterAndPagination {
    filter: String
    skip: Int
    take: Int
    orderBy: SnippetOrderByInput
  }

  type AllSnippetsResponse {
    data: [Snippet]!
    count: Int!
  }

  type Query {
    snippets(input: SnippetQueryFilterAndPagination): AllSnippetsResponse @skipAuth
    snippet(id: Int!): Snippet @skipAuth
  }

  input ConnectOrCreateTagInput {
    id: Int
    name: String!
  }

  input CreateSnippetInput {
    title: String!
    body: String!
    authorId: Int!
    pageId: Int
    tags: [ConnectOrCreateTagInput]
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
    saveSnippet(id: Int!): Snippet! @requireAuth
    unsaveSnippet(id: Int!): Snippet! @requireAuth
  }
`
