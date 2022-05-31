export const USER_DATA_QUERY = gql`
  query UserQuery($id: Int!, $fetchPrivateData: Boolean!) {
    user: user(id: $id) {
      id @include(if: $fetchPrivateData)
      username
      roles  @include(if: $fetchPrivateData)
      isBanned @include(if: $fetchPrivateData)
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
          snippet {
            id
            title
          }
        }
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
          snippet {
            id
            title
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
      comments {
        id
        body
        createdAt
        activity
        score
        author {
          username
        }
        snippet {
          id
          title
        }
      }
    }
  }
`

export const USER_DATA_QUERY_BY_USERNAME = gql`
  query UserQuery($username: String!, $fetchPrivateData: Boolean!) {
    user: userByUsername(username: $username) {
      id @include(if: $fetchPrivateData)
      username
      roles @include(if: $fetchPrivateData)
      isBanned @include(if: $fetchPrivateData)
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
          snippet {
            id
            title
          }
        }
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
          snippet {
            id
            title
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
      comments {
        id
        body
        createdAt
        activity
        score
        author {
          username
        }
        snippet {
          id
          title
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
