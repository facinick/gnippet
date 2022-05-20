export const schema = gql`
  type Vote {
    id: Int!
    type: VoteType!
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

  enum VoteType {
    UPVOTE
    DOWNVOTE
  }
  enum EntityType {
    COMMENT
    SNIPPET
  }

  type Query {
    vote(id: Int!): Vote @requireAuth
  }

  input VotingInput {
    snippetId: Int
    entityType: EntityType!
  }

  type Mutation {
    upvote(id: Int!, input: VotingInput): Vote! @requireAuth
    downvote(id: Int!, input: VotingInput): Vote! @requireAuth
  }
`
