import Comment from './Comment'
import { defaultComment } from './Comment.test'

export const generated = () => {
  return <Comment comment={defaultComment} snippetId={0} />
}

export default { title: 'Components/Comment' }
