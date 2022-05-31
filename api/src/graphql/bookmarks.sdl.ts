export const schema = gql`
  type Bookmark {
    id: Int!
    entityType: EntityType!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: Int!
    snippetId: Int
    commentId: Int
    user: User!
    snippet: Snippet
    comment: Comment
  }

  enum EntityType {
    COMMENT
    SNIPPET
  }

  input BookmarksQueryInput {
    userId: Int!
  }

  type Query {
    bookmarks(input: BookmarksQueryInput!): [Bookmark]! @requireAuth
    bookmark(id: Int!): Bookmark @requireAuth
  }

  input CreateBookmarkInput {
    entityType: EntityType!
    userId: Int!
    snippetId: Int
    commentId: Int
  }

  input UpdateBookmarkInput {
    entityType: EntityType
    userId: Int
    snippetId: Int
    commentId: Int
  }

  type Mutation {
    createBookmark(input: CreateBookmarkInput!): Bookmark! @requireAuth
    deleteBookmark(id: Int!): Bookmark! @requireAuth
  }
`
