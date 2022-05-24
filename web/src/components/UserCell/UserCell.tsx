import { useQuery } from "@redwoodjs/web"
import { USER_PUBLIC_DATA_QUERY } from "src/pages/Queries/queries"

interface Props {
  username: string
}

const UserCell = ({ username }: Props) => {

  const [getUserData, {data, error, loading}] = useQuery(USER_PUBLIC_DATA_QUERY, {
    variables: {
      username,
      comments: true,
      snippets: true,
    }
  })

  return (
    <div>
      <h2>{'UserCell'}</h2>
      <p>{'Find me in ./web/src/components/UserCell/UserCell.tsx'}</p>
    </div>
  )
}

export default UserCell
