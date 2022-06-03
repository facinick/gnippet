import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import Search from 'src/components/Search/Search'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import LogoutButton from 'src/components/LogoutButton/LogoutButton'
import WifiStatus from 'src/components/WifiStatus/WifiStatus'
import LoginButton from 'src/components/LoginButton/LoginButton'
import HomeButton from 'src/components/HomeButton/HomeButton'
import Typography from '@mui/material/Typography'
import ThemeShuffle from 'src/components/ThemeShuffle/ThemeShuffle'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster />
      <Stack spacing={5}>
        <header>
          <Stack alignItems={'center'} justifyContent={'cente'} >
          <Grid
            columns={{ xs: 12, sm: 12, md: 12 }}
            flexDirection={'row'}
            alignItems={'center'}
            container
            spacing={2}
          >
            <Grid xs={4} item>
              <div className={'left'}>
                <Stack
                  spacing={1}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  direction={'row'}
                >
                  <div>
                    <HomeButton />
                  </div>
                  <div>
                    <WifiStatus />
                  </div>
                </Stack>
              </div>
            </Grid>
            <Grid xs={4} item>
              <div className={'center'}>
                {/* <Typography textAlign={'center'} variant="h6" component="h6">
                  Fnick;
                </Typography> */}
              </div>
            </Grid>
            <Grid xs={4} item>
              <div className={'right'}>
                <Stack
                  spacing={1}
                  display={'flex'}
                  justifyContent={'flex-end'}
                  alignItems={'center'}
                  direction={'row'}
                >
                  <div>
                    <ThemeSwitch />
                  </div>

                  <div>
                    <ThemeShuffle />
                  </div>

                  {isAuthenticated && (
                    <div>
                      <LogoutButton />
                    </div>
                  )}

                  {!isAuthenticated && (
                    <div>
                      <LoginButton />
                    </div>
                  )}
                </Stack>
              </div>
            </Grid>
          </Grid>
          <Container maxWidth="md">
            <Search />
          </Container>
          </Stack>
        </header>
        <main>{children}</main>
        <footer></footer>
      </Stack>
    </>
  )
}

export default HomeLayout
