import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useEffect } from 'react'
import { AuthProvider } from '@redwoodjs/auth'
import { StyledEngineProvider } from '@mui/material/styles'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import Routes from 'src/Routes'
import { cache } from 'src/localStore/cache'
import ThemeProvider from './theme/ThemeProvider'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { clearNetworkListeners, setNetworkListeners } from './localStore/onlineStatus'

const App = () => {
  useEffect(() => {
    setNetworkListeners()
    return () => {
      clearNetworkListeners()
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
