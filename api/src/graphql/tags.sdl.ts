export const schema = gql`
  type AllSnippetsForTagResponse {
    data: [Snippet]!
    count: Int!
    nextCursor: Int
  }
  input TagSnippetsInput {
    nextCursor: Int
    take: Int!
  }

  type Tag {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    snippets(input: TagSnippetsInput): AllSnippetsForTagResponse!
  }

  input TagOrderByInput {
    name: TagSort
  }

  enum TagSort {
    asc
    desc
  }

  input TagQueryFilterAndPagination {
    filter: String
    skip: Int
    take: Int
    orderBy: TagOrderByInput
  }
  type Query {
    tags(input: TagQueryFilterAndPagination): [Tag]! @skipAuth
    tag(id: Int!): Tag @skipAuth
    tagByName(name: String!): Tag @skipAuth
  }

  input CreateTagInput {
    name: String!
  }

  input UpdateTagInput {
    name: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    # updateTag(id: Int!, input: UpdateTagInput!): Tag! @requireAuth
    deleteTag(id: Int!): Tag! @requireAuth
  }
`
