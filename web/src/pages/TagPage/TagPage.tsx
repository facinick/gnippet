import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const TagPage = ({name} : {name: string}) => {
  return (
    <>
      <MetaTags title="Tag" description="Tag page" />

      <h1>{name}</h1>
    </>
  )
}

export default TagPage
