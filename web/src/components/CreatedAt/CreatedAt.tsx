import { xDaysAgo } from 'src/utils/stringUtils'

interface Props {
  createdAt: string;
}

const CreatedAt = ({ createdAt }: Props) => {
  return (<time dateTime={createdAt}>{xDaysAgo(createdAt)}</time>)
}

export default CreatedAt
