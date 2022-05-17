import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SnippetCell from 'src/components/SnippetCell'

interface Props {
  id: number
}

const SnippetPage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Snippet" description="Snippet page" />

      <h1>Snippet</h1>
      <SnippetCell id={id}></SnippetCell>
    </>
  )
}

export default SnippetPage
