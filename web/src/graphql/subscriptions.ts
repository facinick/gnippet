export const SNIPPET_COMMENT_SUBSCRIPTION = gql`
  subscription snippetComments($snippetId: Int!) {
    commentAdded(input: { snippetId: $snippetId }) {
      mutation
      node {
        id
        body
        score
        parentCommentId
        author {
          username
        }
        createdAt
      }
    }
  }
`
