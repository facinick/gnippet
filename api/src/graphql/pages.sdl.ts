export const schema = gql`
  type Page {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    creatorId: Int!
    createdBy: User!
    snippets: [Snippet]!
    joinedUsers: [User]!
  }

  type Query {
    pages: [Page!]! @skipAuth
    page(id: Int!): Page @skipAuth
  }

  input CreatePageInput {
    name: String!
    creatorId: Int!
  }

  input UpdatePageInput {
    name: String
    creatorId: Int
  }

  type Mutation {
    createPage(input: CreatePageInput!): Page! @requireAuth
    updatePage(id: Int!, input: UpdatePageInput!): Page! @requireAuth
    deletePage(id: Int!): Page! @requireAuth
  }
`
