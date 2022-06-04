import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useAuth } from '@redwoodjs/auth/dist/useAuth'
import PersonIcon from '@mui/icons-material/Person'
import { navigate, routes } from '@redwoodjs/router'
import MenuList from '@mui/material/MenuList'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from 'src/theme/ThemeProvider'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

interface Props {
  showThemeOptions: boolean
}

export default function ProfileButton({ showThemeOptions }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const { isAuthenticated, currentUser, logOut, loading } = useAuth()
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  const gotoUserProfile = () =>
    navigate(routes.user({ username: currentUser?.username }))

  const open = Boolean(anchorEl)
  const handleProfileButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      navigate(routes.login())
    } else {
      setAnchorEl(event.currentTarget)
    }
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

  const tooltipText = isAuthenticated ? 'Account' : 'Login'

  return (
    <React.Fragment>
      <Tooltip title={tooltipText}>
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
        </IconButton>
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
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuList dense>
          <MenuItem onClick={handleGotoProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <Divider />
          {showThemeOptions && (
            <MenuItem onClick={colorMode.toggleColorMode}>
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
            </MenuItem>
          )}
          {showThemeOptions && (
            <MenuItem onClick={colorMode.shuffleColorTheme}>
              <ListItemIcon>
                <ColorLensIcon fontSize="small" />
              </ListItemIcon>
              Theme Switch
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  )
}
