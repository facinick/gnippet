export const USER_DATA_QUERY = gql`
  query UserQuery($id: Int!) {
    user: user(id: $id) {
      id
      username
      roles
      isBanned
      avatarUrl
      bio
      createdAt
    }
  }
`

export const USER_VOTES_QUERY = gql`
  query UserVotesQuery($userId: Int) {
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