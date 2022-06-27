import Chip from '@mui/material/Chip'
import TagIcon from '@mui/icons-material/Tag'
import { navigate, routes } from '@redwoodjs/router'

interface Props {
  style: React.CSSProperties
  name: string
}

const Tag = ({ name, style }: Props) => {
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
      style={style}
      id={name}
      onClick={() => navigate(routes.tag({ name }))}
      key={name}
      label={name}
      title={`View other posts tagged with ${name}`}
    />
  )
}

export default Tag
