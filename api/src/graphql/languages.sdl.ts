export const schema = gql`
  type Language {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    snippets: [Snippet]!
  }

  type Query {
    languages: [Language]! @requireAuth
    language(id: Int!): Language @requireAuth
  }

  input CreateLanguageInput {
    name: String!
  }

  input UpdateLanguageInput {
    name: String
  }

  type Mutation {
    createLanguage(input: CreateLanguageInput!): Language! @requireAuth
    updateLanguage(id: Int!, input: UpdateLanguageInput!): Language!
      @requireAuth
    deleteLanguage(id: Int!): Language! @requireAuth
  }
`
