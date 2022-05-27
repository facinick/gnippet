export const schema = gql`
  type Vote {
    id: Int!
    value: Int!
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

  input VotesQueryInput {
    userId: Int
  }

  type Query {
    votes(input: VotesQueryInput): [Vote]! @requireAuth
    vote(id: Int!): Vote @requireAuth
  }

  enum EntityType {
    COMMENT
    SNIPPET
  }

  enum CUDAction {
    CREATED
    DELETED
    UPDATED
  }

  input VotingInput {
    snippetId: Int
    commentId: Int
    entityType: EntityType!
  }

  input CreateVoteInput {
    value: Int!
    entityType: EntityType!
    userId: Int!
    snippetId: Int
    commentId: Int
  }

  input UpdateVoteInput {
    value: Int
    entityType: EntityType
    userId: Int
    snippetId: Int
    commentId: Int
  }

  union Entity = Comment | Snippet

  type VoteResponse {
    vote: Vote!
    cudAction: CUDAction!
    score: Int!
  }

  type Mutation {
    createVote(input: CreateVoteInput): Vote! @requireAuth
    deleteVote(id: Int): Vote! @requireAuth
    updateVote(id: Int, input: UpdateVoteInput): Vote! @requireAuth
    upvote(input: VotingInput): VoteResponse! @requireAuth
    downvote(input: VotingInput): VoteResponse! @requireAuth
  }
`
