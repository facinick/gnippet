export const schema = gql`
  type User {
    id: Int!
    username: String!
    # unwanted data ------------------
    # hashedPassword: String!
    # salt: String!
    # resetToken: String
    # resetTokenExpiresAt: DateTime
    roles: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    isBanned: Boolean!
    bio: String # could be null
    avatarUrl: String # could be null
    # private data ------------------
    snippets(input: SnippetQueryFilterAndPagination): [Snippet]!
    votes: [Vote]!
    comments(input: CommentQueryFilterAndPagination): [Comment]!
    pages(input: PageQueryFilterAndPagination): [Page!]!
    savedSnippets(input: SnippetQueryFilterAndPagination): [Snippet]!
    joinedPages(input: PageQueryFilterAndPagination): [Page]!
  }

  input UserOrderByInput {
    createdAt: UserSort
    updatedAt: UserSort
    username: UserSort
  }

  enum UserSort {
    asc
    desc
  }

  input UserQueryFilterAndPagination {
    filter: String
    skip: Int
    take: Int
    orderBy: UserOrderByInput
  }

  type Query {
    users(input: UserQueryFilterAndPagination): [User!]! @skipAuth
    user(id: Int!): User @skipAuth
    userByUsername(username: String!): User @skipAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    isBanned: Boolean!
    bio: String
    avatarUrl: String
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
    isBanned: Boolean
    bio: String
    avatarUrl: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
