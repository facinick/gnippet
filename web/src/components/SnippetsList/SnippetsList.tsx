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
import { truncate } from 'src/utils/stringUtils'
import { Snippet } from 'types/graphql'

type AuthorUsername = { author: Pick<Snippet['author'], 'username'> }
interface Props {
  snippets: Array<Pick<Snippet, 'title' | 'body' | 'id'> & AuthorUsername>
}

const SnippetTitleLink = styled(Link)<LinkProps>(({ theme }) => ({
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

const SnippetBodyText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: '#888',
  lineHeight: '1.2rem',
  fontSize: '0.8rem',
}))

const SnippetItem = ({
  id,
  title,
  body,
  author,
}: Pick<Snippet, 'id' | 'title' | 'body'> & AuthorUsername) => {
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
            <SnippetTitleLink to={routes.snippet({ id: id })}>
              {title}
            </SnippetTitleLink>
          </Typography>
        }
        secondary={<SnippetBodyText>{`${_newBody}`}</SnippetBodyText>}
      />
    </StyledListItem>
  )
}

const SnippetsList = ({ snippets }: Props) => {
  return (
    <Box >
      <List
        style={{ overflowWrap: 'break-word' }}
        sx={{ bgcolor: 'background.paper' }}
      >
        {snippets.map((snippet) => {
          const { title, body, id, author } = snippet
          return (
            <SnippetItem
              title={title}
              body={body}
              id={id}
              key={id}
              author={author}
            />
          )
        })}
      </List>
    </Box>
  )
}

export default SnippetsList
