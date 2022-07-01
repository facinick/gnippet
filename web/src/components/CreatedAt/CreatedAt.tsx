import { newTimeFormat, xDaysAgo } from 'src/utils/stringUtils';

interface Props {
  createdAt: string;
  formatType?: 'days-ago' | 'date-time'
}

const CreatedAt = ({ createdAt, formatType }: Props) => {
  if (formatType === 'days-ago' || formatType === undefined) {
    return <time dateTime={createdAt}>{xDaysAgo(createdAt)}</time>
  } else {
    return <time dateTime={createdAt}>{newTimeFormat(createdAt)}</time>
  }
}

export default CreatedAt
