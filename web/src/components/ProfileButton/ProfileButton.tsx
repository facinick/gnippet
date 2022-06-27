import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Login from '@mui/icons-material/Login'
import { useAuth } from '@redwoodjs/auth/dist/useAuth'
import PersonIcon from '@mui/icons-material/Person'
import { navigate, routes } from '@redwoodjs/router'
import MenuList from '@mui/material/MenuList'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from 'src/theme/ThemeProvider'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { MenuItemProps, MenuProps, MenuListProps } from '@mui/material'
import { styled } from '@mui/material/styles'
interface Props {
  showThemeOptions: boolean
}

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
}))

export default function ProfileButton({ showThemeOptions }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { isAuthenticated, currentUser, logOut, loading } = useAuth()
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  const gotoUserProfile = () =>
    navigate(routes.user({ username: currentUser?.username }))

  const open = Boolean(anchorEl)

  const handleProfileButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleGotoProfile = () => {
    gotoUserProfile()
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logOut()
    setAnchorEl(null)
  }

  const handleLogin = (event) => {
    navigate(routes.login())
    setAnchorEl(null)
  }

  const handleSignup = (event) => {
    navigate(routes.signup())
    setAnchorEl(null)
  }

  const tooltipText = isAuthenticated ? 'Account' : 'Account'

  return (
    <React.Fragment>
      <Tooltip title={tooltipText}>
        <span>
          <IconButton
            onClick={handleProfileButtonClick}
            size="small"
            disabled={loading}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color={'primary'}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={
                isAuthenticated && currentUser?.username
                  ? `https://avatars.dicebear.com/api/bottts/${currentUser.username}.svg`
                  : undefined
              }
            >
              {!isAuthenticated && <PersonIcon />}
            </Avatar>
            {loading && (
              <CircularProgress
                size={38}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-19px',
                  marginLeft: '-19px',
                }}
              />
            )}
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '200px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
            },
            '& .MuiList-root': {
              padding: '2px',
              bgcolor: 'containerPrimary.main',
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'containerPrimary.main',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList dense>
          {isAuthenticated && (
            <StyledMenuItem onClick={handleGotoProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </StyledMenuItem>
          )}
          {isAuthenticated && <Divider />}

          {showThemeOptions && (
            <StyledMenuItem onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' && (
                <ListItemIcon>
                  <LightModeIcon fontSize="small" />
                </ListItemIcon>
              )}
              {theme.palette.mode === 'light' && (
                <ListItemIcon>
                  <DarkModeIcon fontSize="small" />
                </ListItemIcon>
              )}
              {theme.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </StyledMenuItem>
          )}
          {showThemeOptions && (
            <StyledMenuItem onClick={colorMode.shuffleColorTheme}>
              <ListItemIcon>
                <ColorLensIcon fontSize="small" />
              </ListItemIcon>
              Theme Switch
            </StyledMenuItem>
          )}

          {!isAuthenticated && (
            <StyledMenuItem onClick={handleLogin}>
              <ListItemIcon>
                <Login fontSize="small" />
              </ListItemIcon>
              Login
            </StyledMenuItem>
          )}

          {!isAuthenticated && (
            <StyledMenuItem onClick={handleSignup}>
              <ListItemIcon>
                <Login fontSize="small" />
              </ListItemIcon>
              Signup
            </StyledMenuItem>
          )}

          {isAuthenticated && (
            <StyledMenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </StyledMenuItem>
          )}
        </MenuList>
      </Menu>
    </React.Fragment>
  )
}
