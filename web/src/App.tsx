import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { StyledEngineProvider } from '@mui/material/styles'
import ThemeProvider from './theme/ThemeProvider'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import { cache } from 'src/localStore/cache'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import { goOffline, goOnline } from './localStore/onlineStatus'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider type="dbAuth">
          <StyledEngineProvider injectFirst>
            <ThemeProvider>
              <RedwoodApolloProvider graphQLClientConfig={{ cache }}>
                <Routes />
              </RedwoodApolloProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
