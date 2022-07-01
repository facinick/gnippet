import { useReactiveVar } from '@apollo/client'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Toaster } from '@redwoodjs/web/toast'
import Footer from 'src/components/Footer/Footer'
import HomeButton from 'src/components/HomeButton/HomeButton'
import ProfileButton from 'src/components/ProfileButton/ProfileButton'
import Search from 'src/components/Search/Search'
import ThemeShuffle from 'src/components/ThemeShuffle/ThemeShuffle'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import { onlineStatusVar } from 'src/localStore/onlineStatus'

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
          style={{
            borderTop: `0.01rem solid ${theme.palette.text.secondary}`,
            padding: 10,
            background: theme.palette.containerPrimary.main
          }}
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
