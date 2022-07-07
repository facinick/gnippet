import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:8911/subscriptions',
    connectionParams: {
      authToken: "this is token"
    },
  })
)

export default wsLink