import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { ColorModeContext } from 'src/theme/ThemeProvider'
import { useTheme } from '@mui/material/styles';
import SnippetsCell from 'src/components/SnippetsCell'

const HomePage = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>HomePage</h1>
      <SnippetsCell></SnippetsCell>
    </>
  )
}

export default HomePage
