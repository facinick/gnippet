export const USER_DATA_QUERY = gql`
  query FindUserQuery($id: Int!, $votes: Boolean!, $snippets: Boolean!) {
    user: user(id: $id) {
      id
      username
      roles
      isBanned
      avatarUrl
      bio
      createdAt
      snippets(input: { orderBy: { createdAt: desc }}) @include(if: $snippets) {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        }
      }
      votes @include(if: $votes) {
        id
        snippetId
        commentId
        userId
        value
        entityType
      }
    }
  }
`