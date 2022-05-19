import Voting from './Voting'

export const ThreeDigitVotes = () => {
  return <Voting vote={0} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={934} />
}

export const TwoDigitVotes = () => {
  return <Voting vote={0} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={52} />
}

export const Unvoted = () => {
  return <Voting vote={0} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={2} />
}

export const Upvoted = () => {
  return <Voting vote={1} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={2} />
}

export const Downvoted = () => {
  return <Voting vote={-1} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={2} />
}

export const UnvotedLoading = () => {
  return <Voting vote={0} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={2} />
}


export const UpvotedLoading = () => {
  return <Voting vote={1} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={2} />
}

export const DownvotedLoading = () => {
  return <Voting vote={-1} onDownvote={()=>console.log('downvote')} onUpvote={() => console.log('upvote')} votes={2} />
}

export default { title: 'Components/Voting' }
