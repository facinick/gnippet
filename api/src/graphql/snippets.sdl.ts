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
    viewCount: Int!
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
    snippets(input: SnippetQueryFilterAndPagination): AllSnippetsResponse
      @skipAuth
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
    imageUrl: String
    tags: [ConnectOrCreateTagInput]
  }

  type ViewCountResponse {
    viewCount: Int
  }

  input ViewCountInput {
    fingerprintId: String!
  }

  type Mutation {
    createSnippet(input: CreateSnippetInput!): Snippet! @requireAuth
    increaseViewCount(id: Int!, input: ViewCountInput!): ViewCountResponse
      @skipAuth
  }
`
