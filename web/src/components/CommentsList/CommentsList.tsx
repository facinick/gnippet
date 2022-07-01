import { LinkProps, ListItemProps, TypographyProps } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Link, navigate, routes } from '@redwoodjs/router'
import * as React from 'react'
import { truncate } from 'src/utils/stringUtils'
import { Comment as GQL_Comment } from 'types/graphql'

type AuthorUsername = { author: Pick<GQL_Comment['author'], 'username'> }

type SnippetIdTitle = { snippet: Pick<GQL_Comment['snippet'], 'id' | 'title'> }

type CommentData = Pick<GQL_Comment, 'body' | 'id'> &
  SnippetIdTitle &
  AuthorUsername
interface Props {
  comments: Array<CommentData>
}

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

const CommenttItem = ({ id, body, author, snippet }: CommentData) => {
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
