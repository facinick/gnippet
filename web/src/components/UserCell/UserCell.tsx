import { useLazyQuery } from '@apollo/client'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { USER_DATA_QUERY } from 'src/pages/Queries/queries'
import Username from '../Username/Username'
import UserActivityCell from 'src/components/UserActivityCell/UserActivityCell'
import UserDataCell from 'src/components/UserDataCell/UserDataCell'
import UserVotesCell from 'src/components/UserVotesCell/UserVotesCell'
import Tabs from '@mui/material/Tabs'
import MuiTab from '@mui/material/Tab'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import CreateIcon from '@mui/icons-material/Create'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { navigate } from '@redwoodjs/router'
import Meta from '../Meta/Meta'
import ProfileBio from '../ProfileBio/ProfileBio'
import Stack from '@mui/material/Stack'

enum Tab {
  ACTIVITY = 0,
  SAVED = 1,
  VOTES = 2,
}
interface Props {
  username: string
  tab: 'activity' | 'saved' | 'votes' | string
}

const getTab = (tab): number => {
  switch (tab) {
    case 'activity':
      return Tab.ACTIVITY
      break
    case 'saved':
      return Tab.SAVED
      break
    case 'votes':
      return Tab.VOTES
      break
    default:
      return Tab.ACTIVITY
  }
}

const getTabName = (tab): 'activity' | 'saved' | 'votes' => {
  switch (tab) {
    case 0:
      return 'activity'
      break
    case 1:
      return 'saved'
      break
    case 2:
      return 'votes'
      break
    default:
      return 'activity'
  }
}

const UserCell = ({ username, tab }: Props) => {
  const { currentUser, isAuthenticated, loading } = useAuth()
  const loadPrivateUserData =
    currentUser?.id && isAuthenticated && currentUser?.username === username

  const isCurrentUserProfile = username === currentUser?.username

  const [_tab, setTab] = useState<Tab>(isCurrentUserProfile ? Tab.ACTIVITY : getTab(tab))

  useEffect(() => {
    navigate(`/u/${username}/${getTabName(_tab)}`)
  }, [_tab])

  const handleTabChange = (event, _tab) => {
    setTab(_tab)
  }

  useEffect(() => {
    if (loading) {
      return
    }

    if (!isAuthenticated) {
      setTab(Tab.ACTIVITY)
    }

    if (username !== currentUser?.username) {
      setTab(Tab.ACTIVITY)
    }

  }, [loading])

  useEffect(() => {
    if(!isCurrentUserProfile) {
      setTab(Tab.ACTIVITY)
    }
  }, [isCurrentUserProfile])

  return (
    <div>
      <Grid spacing={5} container>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          item
          xs={12}
        >
          <Stack alignItems={'center'} justifyContent={'center'} direction="column">
          <Avatar
            sx={{ width: 95, height: 95 }}
            src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
          />
          <Username username={username} />
          </Stack>
        </Grid>
        {/* user bio  */}
        <Grid
          container
          item
          justifyContent={'center'}
          alignItems={'center'}
          xs={12}
        >
          <ProfileBio bio="bio" />
        </Grid>
        {/* user snippets  */}
        <Grid
          container
          item
          justifyContent={'center'}
          alignItems={'center'}
          md={12}
          spacing={5}
          sm={12}
        >
          <Grid
            item
            justifyContent={'center'}
            alignItems={'center'}
            md={12}
            sm={12}
          >
            <Tabs
              // allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={_tab}
              onChange={handleTabChange}
            >
              <MuiTab
                iconPosition="end"
                icon={<CreateIcon />}
                aria-label="User Activity"
                label="Activity"
              />
              <MuiTab
                disabled={!loadPrivateUserData}
                iconPosition="end"
                icon={<BookmarksIcon />}
                aria-label="User Saved Items"
                label="Saved Stuff"
              />
              <MuiTab
                disabled={!loadPrivateUserData}
                iconPosition="end"
                icon={
                  <CompareArrowsIcon style={{ transform: 'rotate(90deg)' }} />
                }
                aria-label="User Saved Items"
                label="Votes"
              />
            </Tabs>
          </Grid>

          <Grid
            item
            justifyContent={'center'}
            alignItems={'flex-start'}
            md={12}
            sm={12}
          >
            {_tab === 0 && (
              <UserActivityCell username={username} fetchPrivateData={false} />
            )}


            {_tab === 1 && !loading && isCurrentUserProfile && (
              <UserDataCell id={currentUser?.id} fetchPrivateData={true} />
            )}
            {_tab === 1 && loading && <Meta loading={true} />}


            {_tab === 2 && !loading && isCurrentUserProfile && (
              <UserVotesCell id={currentUser?.id} fetchPrivateData={true} />
            )}
            {_tab === 2 && loading && <Meta loading={true} />}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserCell
