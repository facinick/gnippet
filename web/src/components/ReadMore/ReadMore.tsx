import { LinkProps, TypographyProps } from '@mui/material'
import { Link, routes } from '@redwoodjs/router'
import { styled } from '@mui/material/styles'
// import ReadMoreIcon from '@mui/icons-material/ReadMore';

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
  return <SnippetReadmoreLink title={'Read More'} to={route}>[read-more]</SnippetReadmoreLink>
}

export default ReadMore
