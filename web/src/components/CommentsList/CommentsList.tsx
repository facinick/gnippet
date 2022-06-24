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
import { LinkProps, TypographyProps, ListItemProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const CommentTitleLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  lineHeight: '1.5rem',
  fontWeight: 600,
  textDecorationThickness: '0.05rem !important',
  fontSize: '1rem',
  textUnderlineOffset: '6px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const StyledListItem = styled(ListItem)<ListItemProps>(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: '20px',
  background: theme.palette.containerPrimary.main,
  outline: '1px solid #333',
}))

const CommentBodyText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#888',
  lineHeight: '1.2rem',
  fontSize: '0.8rem',
}))
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
    <StyledListItem alignItems="flex-start">
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
            <CommentTitleLink to={routes.snippet({ id: snippet.id })}>
              {snippet.title}
            </CommentTitleLink>
          </Typography>
        }
        secondary={<CommentBodyText>{`${_newBody}`}</CommentBodyText>}
      />
    </StyledListItem>
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
