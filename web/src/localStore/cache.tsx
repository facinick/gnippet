import { onlineStatusVar } from "./onlineStatus";
import { InMemoryCache } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isOnline: {
          read () {
            return onlineStatusVar();
          }
        },
        // snippets: {
        //   merge(existing = [], incoming: any[]) {
        //     return [...incoming];
        //   },
        // },
      }
    },
    User: {
      fields: {
        votes: {
          merge(existing = [], incoming: any[]) {
            return [...incoming];
          },
        },
        bookmarks: {
          merge(existing = [], incoming: any[]) {
            return [...incoming];
          },
        },
      },
    },
  }
});