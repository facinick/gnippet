import { onlineStatusVar } from "./onlineStatus";
import { InMemoryCache } from "@apollo/client";
import { sortByVar } from "./homeFeedSortBy";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isOnline: {
          read() {
            return onlineStatusVar()
          },
        },
        homeFeedSortBy: {
          read() {
            return sortByVar()
          },
        },
        // tagByName: {
        //   merge(existing, incoming, { args: { name }, readField }) {
        //     console.log(`merge -----------`)
        //     console.log(`existing`)
        //     console.log(existing)
        //     console.log(`incoming`)
        //     console.log(incoming)
        //     if (!incoming && existing) {
        //       return existing
        //     }
        //     return incoming
        //     // console.log(readField(incoming.__ref))
        //     // const existingSnippets = existing?.snippets?.data || []
        //     // const incomingSnippets =  incoming.snippets.data
        //     // const merged = {
        //     //   ...incoming,
        //     //   snippets: {
        //     //     ...incoming.snippets,
        //     //     data: [...existingSnippets, ...incomingSnippets],
        //     //   },
        //     // }
        //     // console.log(merged)
        //     return incoming
        //   },
        //   read(existing, { args: { name }, readField }) {
        //     console.log(`read -----------`)
        //     console.log(`existing`)
        //     console.log(existing)
        //     return existing
        //   },
        // },
      },
    },
    User: {
      fields: {
        votes: {
          merge(existing = [], incoming: any[]) {
            return [...incoming]
          },
        },
        bookmarks: {
          merge(existing = [], incoming: any[]) {
            return [...incoming]
          },
        },
      },
    },
  },
})