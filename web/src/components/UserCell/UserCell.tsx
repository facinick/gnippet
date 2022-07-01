import BookmarksIcon from '@mui/icons-material/Bookmarks'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import CreateIcon from '@mui/icons-material/Create'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import MuiTab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useAuth } from '@redwoodjs/auth'
import { navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
// @ts-ignore
import UserActivityCell from 'src/components/UserActivityCell/UserActivityCell'
// @ts-ignore
import UserDataCell from 'src/components/UserDataCell/UserDataCell'
// @ts-ignore
import UserVotesCell from 'src/components/UserVotesCell/UserVotesCell'
import { UserProfileQuery } from 'src/graphql/queries'
import Meta from '../Meta/Meta'
import UserCreatedAt from '../UserCreatedAt/UserCreatedAt'
import Username from '../Username/Username'

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

  const userProfile = useQuery(UserProfileQuery, {
    variables: {
      username,
    }
  })

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
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            direction="column"
          >
            <Avatar
              sx={{ width: 95, height: 95 }}
              src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
            />
            <Username style={'default'} username={username} />
            {userProfile?.data?.user?.createdAt && (
              <UserCreatedAt createdAt={userProfile.data.user.createdAt} />
            )}
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
          {/* <ProfileBio
            userId={userProfile?.data?.user?.id}
            username={username}
          /> */}
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
            <Box
              sx={{
                bgcolor: 'background.paper',
                // outline: `1px solid #888`
              }}
            >
              <Tabs
                // allowScrollButtonsMobile
                variant="fullWidth"
                scrollButtons="auto"
                value={_tab}
                onChange={handleTabChange}
              >
                <MuiTab
                  iconPosition="top"
                  icon={<CreateIcon />}
                  aria-label="User Activity"
                  label="Activity"
                />
                <MuiTab
                  disabled={!loadPrivateUserData}
                  iconPosition="top"
                  icon={<BookmarksIcon />}
                  aria-label="User Saved Items"
                  label="Bookmarks"
                />
                <MuiTab
                  disabled={!loadPrivateUserData}
                  iconPosition="top"
                  icon={
                    <CompareArrowsIcon style={{ transform: 'rotate(90deg)' }} />
                  }
                  aria-label="User Saved Items"
                  label="Votes"
                />
              </Tabs>
            </Box>
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
