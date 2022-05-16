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
    bio: String
    avatarUrl: String
    # private data ------------------
    snippets: [Snippet]!
    votes: [Vote]!
    comments: [Comment]!
    pages: [Page]!
    savedSnippets: [Snippet]!
    joinedPages: [Page]!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
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
