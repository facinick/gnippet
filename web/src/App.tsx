import { AuthProvider } from '@redwoodjs/auth'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { StyledEngineProvider } from '@mui/material/styles'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { useEffect } from 'react'
import { cache } from 'src/localStore/cache'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import './index.css'
import { goOffline, goOnline } from './localStore/onlineStatus'
import ThemeProvider from './theme/ThemeProvider'

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
    // @ts-ignore
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
