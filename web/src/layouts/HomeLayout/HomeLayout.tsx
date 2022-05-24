import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import Search from 'src/components/Search/Search'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import LogoutButton from 'src/components/LogoutButton/LogoutButton'
import LoginButton from 'src/components/LoginButton/LoginButton'
import HomeButton from 'src/components/HomeButton/HomeButton'
import Typography from '@mui/material/Typography'

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
          <Grid columns={{xs: 12, sm: 12, md: 12 }} flexDirection={'row'} container spacing={2}>
            <Grid xs={4} item>
                <div className={'left'}>
                  <div>
                    <HomeButton />
                  </div>
                </div>
            </Grid>
            <Grid xs={4} item>
                <div className={'center'}>
                  <Typography textAlign={'center'} variant="h4" component="h2">
                    Fnick;
                  </Typography>
                </div>
            </Grid>
            <Grid xs={4} item>
                <div className={'right'}>
                  <Stack spacing={1}  display={'flex'} justifyContent={'flex-end'} alignItems={'center'} direction={'row'}>
                  <div>
                    <ThemeSwitch />
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
        </header>
        <main>{children}</main>
      </Stack>
    </>
  )
}

export default HomeLayout
