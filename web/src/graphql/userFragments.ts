export const UserVotesQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      votes {
        id
        snippetId
        type
        commentId
      }
    }
  }
`