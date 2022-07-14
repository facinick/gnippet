import { makeVar } from "@apollo/client";

type OnlineStatus = boolean

// Create the initial value
const status: OnlineStatus = true

// Create the todos var and initialize it with the initial value
export const onlineStatusVar = makeVar<OnlineStatus>(
  status
);

export const goOnline = () => onlineStatusVar(true)

export const goOffline = () => onlineStatusVar(false)

export const setNetworkListeners = () => {
  window.addEventListener('online', goOnline)
  window.addEventListener('offline', goOffline)
}

export const clearNetworkListeners = () => {
  window.removeEventListener('online', goOnline)
  window.removeEventListener('offline', goOffline)
}