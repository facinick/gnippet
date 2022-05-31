import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Snippet } from 'types/graphql'
import Username from '../Username/Username'
import { Link, navigate, routes } from '@redwoodjs/router'
import { truncate } from 'src/utils/stringUtils'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'

interface Props {
  snippets: Array<Snippet>
}

const SnippetItem = ({
  id,
  title,
  body,
  author,
}: Pick<Snippet, 'id' | 'title' | 'body' | 'author'>) => {
  const authorUsername = author.username

  let _newBody = body
  if (body.length >= 100) {
    _newBody = truncate(body, 100)
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          component={IconButton}
          onClick={() => {
            navigate(routes.user({ username: author.username }))
          }}
          alt={`${authorUsername}`}
          sx={{ width: 55, height: 55 }}
          src={`https://avatars.dicebear.com/api/bottts/${authorUsername}.svg`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Link to={routes.snippet({ id: id })}>
              <Typography>{title}</Typography>
            </Link>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography>{`${_newBody}`}</Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

const BookmarksList = ({ snippets }: Props) => {
  return (
      <Paper style={{maxWidth: '360px'}} variant="elevation" >
        <List
          style={{ overflowWrap: 'break-word' }}
          sx={{ bgcolor: 'background.paper' }}
        >
          {snippets.map((snippet) => {
            const { title, body, id, author } = snippet
            return (
              <React.Fragment key={id}>
                <SnippetItem
                  title={title}
                  body={body}
                  id={id}
                  author={author}
                />
                <Divider variant="inset" component="li" />
              </React.Fragment>
            )
          })}
        </List>
        </Paper>
  )
}

export default BookmarksList
