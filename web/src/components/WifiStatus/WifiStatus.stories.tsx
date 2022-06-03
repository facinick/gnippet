import { goOnline, goOffline } from 'src/localStore/onlineStatus'
import WifiStatus from './WifiStatus'

export const online = () => {
  goOnline()
  return <WifiStatus />
}

export const offline = () => {
  goOffline()
  return <WifiStatus />
}

export default { title: 'Components/WifiStatus' }
