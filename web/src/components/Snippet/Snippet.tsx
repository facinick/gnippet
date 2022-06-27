import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { _Snippet, _SnippetWithVotes, _Vote } from 'src/gql_objects/gqlObjects'
import { readingTimeInMinutes, truncate as returnTruncatedText } from 'src/utils/stringUtils'
import CreatedAt from '../CreatedAt/CreatedAt'
import Username from '../Username/Username'
import Voting from '../Voting/Voting'
import Bookmark from '../Bookmark/Bookmark'
import ReadMore from '../ReadMore/ReadMore'
import Space from '../Space/Space'
import BackButton from '../BackButton/BackButton'
import ReadingTime from '../ReadingTime/ReadingTime'
import Stack from '@mui/material/Stack'
import SnippetTags from '../SnippetTags/SnippetTags'
import CommentForm from '../CommentForm/CommentForm'
import Comments from '../Comments/Comments'
import { Snippet } from 'types/graphql'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import NumberOfComments from '../NumberOfComments/NumberOfComments'
import CommentsHeader from '../CommentsHeader/CommentsHeader'
import FullSnippetBody from '../FullSnippetBody/FullSnippetBody'
import CopySnippetUrl from '../CopySnippetUrl/CopySnippetUrl'
import { LinkProps, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

type Props = {
  snippet: Omit<Snippet, 'authorId' | 'languages' | 'updatedAt' | 'votes'>
  truncate: boolean
  showActivity: boolean
  showBackButton: boolean
  showComments: boolean
  showCommentsForm: boolean
  showCommentsHeader: boolean
  showHeaderImage: boolean
  showReadingTimeBottom: boolean
}

const SnippetTitleText = styled(Typography)<TypographyProps>(({ theme }) => ({
  // color: theme.palette.containerPrimary.contrastText,
}))

const SnippetAuthorNameText = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.containerPrimary.contrastText,
    display: 'inline-block',
  })
)

const SnippetTitleLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '10px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const SnippetReadmoreLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '10px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

const SnippetUi = ({
  showBackButton,
  showActivity,
  showHeaderImage,
  snippet,
  truncate,
  showComments,
  showCommentsForm,
  showCommentsHeader,
  showReadingTimeBottom
}: Props) => {
  const {
    id,
    title,
    score,
    author,
    body,
    createdAt,
    tags,
    comments,
    imageUrl,
  } = snippet
  const { isAuthenticated, currentUser } = useAuth()

  const showNumberOfComments = comments.length > 0 && !showCommentsHeader
  const rendertags = tags.length > 0

  return (
    <article key={id}>
      <Stack style={{ overflowWrap: 'break-word' }} spacing={2}>
        <header>
          <Stack alignItems={'center'} spacing={1} direction={'row'}>
            {showBackButton && <BackButton />}
            {showHeaderImage && imageUrl && (
              <Avatar style={{ marginRight: 10 }} src={imageUrl} />
            )}
            <SnippetTitleLink to={routes.snippet({ id: id })}>
              <SnippetTitleText variant="h6">{title}</SnippetTitleText>
            </SnippetTitleLink>
          </Stack>
        </header>
        {truncate && (
          <Typography
            variant="body1"
            component="p"
            style={{ whiteSpace: 'pre-line' }}
          >
            {returnTruncatedText(body, 150)}
            <Space />
            {body.length > 150 && (
              <>
                <ReadMore route={routes.snippet({ id })} />
                <Space />
              </>
            )}
            {'-'}
            <Space />
            <CreatedAt createdAt={createdAt} />
            <Space />
            {'by'}
            <Space />
            <SnippetAuthorNameText variant="body1" component="i">
              {<Username username={author.username} />}
            </SnippetAuthorNameText>
          </Typography>
        )}
        {!truncate && (
          <Typography
            variant="body1"
            component="p"
            style={{ whiteSpace: 'pre-line' }}
          >
            <FullSnippetBody
              body={body}
              imageUrl={imageUrl}
              altText={'some alt text'}
            />

            <Typography variant="body1" component="i">
              <div style={{ margin: '15px 0px' }}>
                {'Posted on '}
                <CreatedAt formatType={'date-time'} createdAt={createdAt} />
                <Space />
                {'by'}
                <Space />
                <SnippetAuthorNameText>
                  <Username username={author.username} />
                </SnippetAuthorNameText>
              </div>
            </Typography>
          </Typography>
        )}
        <Stack direction={'row'} alignItems={'center'}>
          <Voting entity={'SNIPPET'} snippetId={id} score={score} />
          {isAuthenticated && <Bookmark entity={'SNIPPET'} snippetId={id} />}
          <CopySnippetUrl id={id} />
          {showReadingTimeBottom && (
            <ReadingTime timeInMinutes={readingTimeInMinutes(body)} />
          )}
        </Stack>
        {rendertags && <SnippetTags tags={tags} />}
        {isAuthenticated && showCommentsForm && (
          <CommentForm
            authorUsername={currentUser?.username}
            snippetId={id}
            authorId={currentUser.id}
          />
        )}
        {showNumberOfComments && <NumberOfComments value={comments.length} />}
        {showCommentsHeader && (
          <CommentsHeader numberOfComments={comments.length} />
        )}
        {showComments && <Comments comments={comments} />}
      </Stack>
    </article>
  )
}

export default SnippetUi
