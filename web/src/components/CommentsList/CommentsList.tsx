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
import Box from '@mui/material/Box'

interface Props {
  comments: Array<Comment>
}

const CommenttItem = ({
  id,
  body,
  author,
  snippet,
}: Pick<Comment, 'id' | 'body' | 'author' | 'snippet'>) => {
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
            <Typography>
              <Link to={routes.snippet({ id: snippet.id })}>
                {snippet.title}
              </Link>
            </Typography>
        }
        secondary={
            <Typography>{`${_newBody}`}</Typography>
        }
      />
    </ListItem>
  )
}

const CommentsList = ({ comments }: Props) => {
  return (
    <Box>
      <List
        style={{ overflowWrap: 'break-word' }}
        sx={{ bgcolor: 'background.paper' }}
      >
        {comments.map((comment) => {
          const { body, id, author, snippet } = comment
          return (
            <React.Fragment key={id}>
              <CommenttItem
                snippet={snippet}
                body={body}
                id={id}
                author={author}
              />
            </React.Fragment>
          )
        })}
      </List>
    </Box>
  )
}

export default CommentsList
