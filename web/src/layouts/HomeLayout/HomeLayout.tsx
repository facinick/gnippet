import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import Search from 'src/components/Search/Search'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import { onlineStatusVar } from 'src/localStore/onlineStatus'
import { useReactiveVar } from '@apollo/client'
import LogoutButton from 'src/components/LogoutButton/LogoutButton'
import WifiStatus from 'src/components/WifiStatus/WifiStatus'
import LoginButton from 'src/components/LoginButton/LoginButton'
import ProfileButton from 'src/components/ProfileButton/ProfileButton'
import Footer from 'src/components/Footer/Footer'
import ThemeButtonGroup from 'src/components/ThemeButtonGroup/ThemeButtonGroup'
import HomeButton from 'src/components/HomeButton/HomeButton'
import Typography from '@mui/material/Typography'
import ThemeShuffle from 'src/components/ThemeShuffle/ThemeShuffle'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const isOnline = useReactiveVar(onlineStatusVar)
  const theme = useTheme();
  const showThemeOptionsInHeader = useMediaQuery(theme.breakpoints.up('sm'));
  const showThemeOptionsInProfileMenu = !showThemeOptionsInHeader

  return (
    <>
      {!isOnline && (
        <LinearProgress color={'error'} variant="determinate" value={100} />
      )}
      <Toaster />
      <Stack sx={{minHeight: '100%'}} justifyContent={'flex-start'} spacing={5}>
        <header style={{ padding: 10 }}>
          <Stack
            justifyContent={'space-evenly'}
            alignItems={'center'}
            direction={'row'}
            spacing={2}
          >
            <HomeButton />
            <Search />
            {showThemeOptionsInHeader && (
              <>
                <ThemeSwitch />
                <ThemeShuffle />
              </>
            )}
            <ProfileButton showThemeOptions={showThemeOptionsInProfileMenu} />
          </Stack>
        </header>
        <main style={{flexGrow: 1}}>{children}</main>
        <footer
          style={{ borderTop: `0.01rem solid ${theme.palette.text.secondary}`, padding: 10, background: theme.palette.containerPrimary.main }}
        >
          <Stack alignItems={'center'}>
            <Footer />
          </Stack>
        </footer>
      </Stack>
    </>
  )
}

export default HomeLayout
