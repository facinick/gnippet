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
        }
      }
    }
  }
});