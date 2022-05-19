import { Loading, Empty, Failure, Success } from './SnippetsCell'
import { standard } from './SnippetsCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {

  mockCurrentUser({
    id: 1,
    username: "facinick",
    isBanned: false
  })

  return Success ? <Success {...standard()} /> : null
}

export default { title: 'Cells/SnippetsCell' }
