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
    // Snippet: {
    //   fields: {
    //     comments: {
    //       // merge(existing = [], incoming: any[]) {
    //       //   console.log(existing)
    //       //   console.log(incoming)
    //       //   return [...incoming]
    //       // },
    //       merge(existing: any[], incoming: any[], { readField, mergeObjects }) {

    //         // existing comments: 7->null 6->null 4->null 2->null 1->null
    //         // incoming comments: 8->7 7->null 6->null 4->null 2->null 1->null

    //         const merged: any[] = existing ? existing.slice(0) : []
    //         const commentNameIdIndex: Record<string, number> =
    //           Object.create(null)
    //         if (existing) {
    //           existing.forEach((comment, index) => {
    //             commentNameIdIndex[readField<string>('id', comment)] = index
    //           })

    //           console.log(`comment name to index`)
    //           console.log(commentNameIdIndex)
    //         }
    //         incoming.forEach((comment) => {
    //           const name = readField<string>('id', comment)
    //           const index = commentNameIdIndex[name]
    //           if (typeof index === 'number') {
    //             // Merge the new comment data with the existing comment data.
    //             merged[index] = mergeObjects(merged[index], comment)
    //           } else {
    //             // First time we've seen this comment in this array.
    //             commentNameIdIndex[name] = merged.length
    //             merged.push(comment)
    //           }
    //         })
    //         // return merged
    //         console.log(merged)

    //          return [...incoming]
    //       },
    //     },
    //   },
    // },
  },
})