import Chip from '@mui/material/Chip'
import { Tag } from 'types/graphql'
import TagIcon from '@mui/icons-material/Tag'
interface Props {
  tags: Array<Pick<Tag, 'id' | 'name'>>
}

const SnippetTags = ({ tags }: Props) => {
  const n = tags.length
  return (
    <div>
      {tags.map(({ name }, index) => {
        const isFirstTag = index === 0
        const isLastTag = index === n - 1
        return (
          <Chip
            color={'primary'}
            size="small"
            sx={{
              fontSize: 14,
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
            icon={<TagIcon />}
            style={
              isFirstTag
                ? { marginRight: 8 }
                : isLastTag
                ? {}
                : { marginRight: 8 }
            }
            id={name}
            key={name}
            label={name}
          />
        )
      })}
    </div>
  )
}

export default SnippetTags
