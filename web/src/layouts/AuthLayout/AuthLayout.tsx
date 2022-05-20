import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch'
import HomeButton from 'src/components/HomeButton/HomeButton'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  return (
    <>
      <Toaster />
      <Stack spacing={5}>
        <header>
          <Stack spacing={1} direction="row" alignItems={"center"}>
            <div>
              <HomeButton />
            </div>
            <div>
              <ThemeSwitch />
            </div>
          </Stack>
        </header>
        <main>
          <Container maxWidth="xs">{children}</Container>
        </main>
      </Stack>
    </>
  )
}

export default HomeLayout
