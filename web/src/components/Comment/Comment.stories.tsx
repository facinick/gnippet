import Comment from './Comment'
import { defaultComment } from './Comment.test'

export const generated = () => {
  return <Comment comment={defaultComment} />
}

export default { title: 'Components/Comment' }
