import CreatedAt from './CreatedAt'
import { futureDateString, nowDateString, pastDateString } from './CreatedAt.test'

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
