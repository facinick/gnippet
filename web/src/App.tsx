import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { StyledEngineProvider } from '@mui/material/styles'
import ThemeProvider from './theme/ThemeProvider'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </ThemeProvider>
        </StyledEngineProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
