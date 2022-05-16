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
    votes: [Vote!]! @requireAuth
    vote(id: Int!): Vote @requireAuth
  }

  input CreateVoteInput {
    type: VoteType!
    entityType: EntityType!
    userId: Int!
    snippetId: Int
    commentId: Int
  }

  input UpdateVoteInput {
    type: VoteType
    entityType: EntityType
    userId: Int
    snippetId: Int
    commentId: Int
  }

  type Mutation {
    createVote(input: CreateVoteInput!): Vote! @requireAuth
    updateVote(id: Int!, input: UpdateVoteInput!): Vote! @requireAuth
    deleteVote(id: Int!): Vote! @requireAuth
  }
`
