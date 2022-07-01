export const VIEW_COUNT_MUTATION = gql`
  mutation FindViewCountQuery($id: Int!, $fingerprintId: String!) {
    increaseViewCount(id: $id, input: { fingerprintId: $fingerprintId }) {
      viewCount
    }
  }
`
export const UPVOTE_MUTATION = gql`
  mutation upvoteMutation($input: VotingInput) {
    upvote(input: $input) {
      vote {
        id
        value
        entityType
        userId
        commentId
        snippetId
      }
      cudAction
      score
    }
  }
`

export const DOWNVOTE_MUTATION = gql`
  mutation downvoteMutation($input: VotingInput) {
    downvote(input: $input) {
      vote {
        id
        value
        entityType
        userId
        commentId
        snippetId
      }
      cudAction
      score
    }
  }
`