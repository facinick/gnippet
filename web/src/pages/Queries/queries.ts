export const USER_DATA_QUERY = gql`
  query UserQuery($id: Int!, $fetchPrivateData: Boolean!) {
    user: user(id: $id) {
      id
      username
      roles
      isBanned
      avatarUrl
      bio
      createdAt
      votes @include(if: $fetchPrivateData) {
        id
        snippetId
        commentId
        userId
        value
        entityType
      }
      bookmarks @include(if: $fetchPrivateData) {
        id
        snippetId
        commentId
        userId
        entityType
        snippet {
          id
          title
          body
          author {
            username
          }
        }
        comment {
          id
          body
          author {
            username
          }
        }
      }
      snippets {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        }
        tags {
          id
          name
        }
      }
    }
  }
`

export const USER_VOTES_QUERY = gql`
  query UserVotesQuery($userId: Int!) {
    votes: votes(input: { userId: $userId }) {
      id
      snippetId
      commentId
      userId
      value
      entityType
    }
  }
`

export const USER_BOOKMARKS_QUERY = gql`
  query UserBookmarksQuery($userId: Int!) {
    bookmarks: bookmarks(input: { userId: $userId }) {
      id
      snippetId
      commentId
      userId
      entityType
    }
  }
`

export const CREATE_BOOKMARK_MUTATION = gql`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    bookmark: createBookmark(input: $input) {
      id
      snippetId
      commentId
      userId
      entityType
    }
  }
`

export const DELETE_BOOKMARK_MUTATION = gql`
  mutation DeleteBookmarkMutation($id: Int!) {
    bookmark: deleteBookmark(id: $id) {
      id
      snippetId
      commentId
      userId
      entityType
    }
  }
`
