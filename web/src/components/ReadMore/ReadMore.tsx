import { LinkProps, TypographyProps } from '@mui/material'
import { Link, routes } from '@redwoodjs/router'
import { styled } from '@mui/material/styles'

const SnippetReadmoreLink = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '10px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

interface Props {
  route: string
}

const ReadMore = ({ route }: Props) => {
  return <SnippetReadmoreLink to={route}>[read-more]</SnippetReadmoreLink>
}

export default ReadMore
