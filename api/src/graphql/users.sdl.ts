export const schema = gql`
  type User {
    id: Int!
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    isBanned: Boolean!
    bio: String
    avatarUrl: String
    snippets: [Snippet]!
    votes: [Vote]!
    comments: [Comment]!
    pages: [Page]!
    savedSnippets: [Snippet]!
    joinedPages: [Page]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
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
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
