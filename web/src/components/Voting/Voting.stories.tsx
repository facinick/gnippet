import Voting from './Voting'

export const ThreeDigitVotes = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={934} />
}

export const TwoDigitVotes = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={52} />
}

export const Unvoted = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={2} />
}

export const Upvoted = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={2} />
}

export const Downvoted = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={2} />
}

export const UnvotedLoading = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={2} />
}

export const UpvotedLoading = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={2} />
}

export const DownvotedLoading = () => {
  return <Voting snippetId={1} commentId={1} entity={'SNIPPET'} score={2} />
}

export default { title: 'Components/Voting' }
