import { TrendingUpOutlined } from '@mui/icons-material'
import { Box, LinkProps, TypographyProps } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import LottieAnimation from 'src/lottie/Animation'
import {
  isLessThan24HourAgo,
  readingTimeInMinutes,
  truncate as returnTruncatedText
} from 'src/utils/stringUtils'
import { Comment, Snippet, Tag } from 'types/graphql'
import BackButton from '../BackButton/BackButton'
import Bookmark from '../Bookmark/Bookmark'
import CommentForm from '../CommentForm/CommentForm'
import Comments from '../Comments/Comments'
import CommentsHeader from '../CommentsHeader/CommentsHeader'
import CopySnippetUrl from '../CopySnippetUrl/CopySnippetUrl'
import CreatedAt from '../CreatedAt/CreatedAt'
import FullSnippetBody from '../FullSnippetBody/FullSnippetBody'
import NumberOfComments from '../NumberOfComments/NumberOfComments'
import ReadingTime from '../ReadingTime/ReadingTime'
import ReadMore from '../ReadMore/ReadMore'
import SnippetTags from '../SnippetTags/SnippetTags'
import Space from '../Space/Space'
import Username from '../Username/Username'
import ViewCount from '../ViewCount/ViewCount'
import Voting from '../Voting/Voting'
import newAnimation from 'src/lottie/assets/new-three.json'

type SnippetData = Pick<
  Snippet,
  'imageUrl' | 'viewCount' | 'createdAt' | 'id' | 'title' | 'score' | 'body'
>

type AuthorUsername = { author: Pick<Snippet['author'], 'username'> }

type TagsAll = { tags: Array<Pick<Tag, 'name' | 'id'>> }

type CommentsAll = {
  comments: Array<
    Pick<Comment, 'body' | 'id' | 'parentCommentId'> & AuthorUsername
  >
}

type Props = {
  snippet: SnippetData & AuthorUsername & TagsAll & CommentsAll
  truncate: boolean
  showActivity: boolean
  showBackButton: boolean
  showComments: boolean
  showCommentsForm: boolean
  showCommentsHeader: boolean
  showHeaderImage: boolean
  showReadingTimeBottom: boolean
  showViewCount: boolean
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
  marginRight: '10px',
  display: 'inline',
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
  showReadingTimeBottom,
  showViewCount,
}: Props) => {
  const {
    id,
    title,
    score,
    author,
    body,
    createdAt,
    tags,
    viewCount,
    comments,
    imageUrl,
  } = snippet
  const { isAuthenticated, currentUser } = useAuth()

  const showNumberOfComments = comments.length > 0 && !showCommentsHeader
  const rendertags = tags.length > 0

  const isNewPost = false
  return (
    <article key={id}>
      <Stack style={{ overflowWrap: 'break-word' }} spacing={2}>
        <header>
          <Stack alignItems={'center'} spacing={1} direction={'row'}>
            {showBackButton && <BackButton />}
            {showHeaderImage && imageUrl && (
              <Avatar style={{ marginRight: 10 }} src={imageUrl} />
            )}
            {/* @ts-ignore */}
            <SnippetTitleText component={'h1'} variant="h6">
              <SnippetTitleLink to={routes.snippet({ id: id })}>
                {title}
              </SnippetTitleLink>
              {isNewPost &&
              <Box
              sx={{
                display: 'inline-block',
                width: '80px',
                height: '40px',
                position: 'relative',
                padding: '3px 0px',
                top: '11px',
                pointerEvents: 'none',
              }}
              >
                <LottieAnimation
                  autoplay={true}
                  loop={true}
                  animationDataJSON={newAnimation}
                />
              </Box>}
              <CopySnippetUrl id={id} />
            </SnippetTitleText>
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
            {/* @ts-ignore */}
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
          <Voting
            size={'large'}
            entity={'SNIPPET'}
            snippetId={id}
            score={score}
          />
          {isAuthenticated && (
            <Bookmark size={'large'} entity={'SNIPPET'} snippetId={id} />
          )}
          {showReadingTimeBottom && (
            <ReadingTime timeInMinutes={readingTimeInMinutes(body)} />
          )}
          {showViewCount && <ViewCount viewCount={viewCount} />}
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
        {showComments && <Comments snippetId={id} comments={comments} />}
      </Stack>
    </article>
  )
}

export default SnippetUi
