import { Tag as GTag } from 'types/graphql'
import Tag from '../Tag/Tag'
interface Props {
  tags: Array<Pick<GTag, 'id' | 'name'>>
}

const SnippetTags = ({ tags }: Props) => {
  const n = tags.length
  return (
    <div>
      {tags.map(({ name }, index) => {
        const isFirstTag = index === 0
        const isLastTag = index === n - 1
        return (
          <Tag
            key={name}
            style={
              isFirstTag
                ? { marginRight: 8, marginBottom: 8 }
                : isLastTag
                ? { marginBottom: 8 }
                : { marginRight: 8, marginBottom: 8 }
            }
            name={name}
          />
        )
      })}
    </div>
  )
}

export default SnippetTags
