import CreatedAt from './CreatedAt'
import { pastDateString, nowDateString, futureDateString } from './CreatedAt.test'

export const past = () => {
  return <CreatedAt createdAt={pastDateString} />
}

export const now = () => {
  return <CreatedAt createdAt={nowDateString} />
}

export const future = () => {
  return <CreatedAt createdAt={futureDateString} />
}

export default { title: 'Components/CreatedAt' }
