import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import HomeButton from 'src/components/HomeButton/HomeButton'
import Footer from 'src/components/Footer/Footer'
import { useTheme } from '@mui/material/styles'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const theme = useTheme()
  return (
    <>
      <Toaster />
      <Stack
        sx={{ minHeight: '100%' }}
        justifyContent={'flex-start'}
        spacing={5}
      >
        <header>
          <Stack spacing={1} direction="row" alignItems={'center'}>
            <div>
              <HomeButton />
            </div>
          </Stack>
        </header>
        <main style={{ flexGrow: 1 }}>
          <Container maxWidth={'xs'}>
            {children}
          </Container>
        </main>
        <footer
          style={{
            borderTop: `0.01rem solid ${theme.palette.text.secondary}`,
            padding: 10,
            background: theme.palette.containerPrimary.main,
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
