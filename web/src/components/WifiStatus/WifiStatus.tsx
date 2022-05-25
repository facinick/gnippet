import { onlineStatusVar } from 'src/localStore/onlineStatus'
import { useReactiveVar } from '@apollo/client';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import IconButton from '@mui/material/IconButton';

const WifiStatus = () => {

  const isOnline = useReactiveVar(onlineStatusVar);

  return (
    <div>
      { !isOnline &&
        <IconButton disabled aria-label="device-offline">
          <SignalWifiOffIcon color={'error'} />
        </IconButton>
      }
      { isOnline &&
        <IconButton disabled aria-label="device-offline">
          <SignalWifiStatusbar4BarIcon color={'success'} />
        </IconButton>
      }
    </div>
  )
}

export default WifiStatus
