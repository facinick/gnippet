import { styled } from '@mui/material/styles'
import { Stack, Typography, TypographyProps } from '@mui/material'

const SnippetBodyText = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.containerPrimary.contrastText,
  textDecorationThickness: '0.05rem !important',
  textUnderlineOffset: '10px',
  '&::first-letter': {
    fontSize: '3rem',
    float: 'left',
    lineHeight: '74px',
    border: `solid ${theme.palette.containerPrimary.contrastText}`,
    padding: '5px 10px',
    marginRight: '8px',
  },
}))

const SnippetBodyImage = styled('img')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  margin: `10px 0px 20px 0px`,
}))

interface Props {
  body: string
  imageUrl?: string
  altText?: string
}

const FullSnippetBody = ({ body, imageUrl, altText }: Props) => {
  return (
    <Stack>
      {imageUrl && <SnippetBodyImage src={imageUrl} alt={altText} />}
      <SnippetBodyText>{body}</SnippetBodyText>
    </Stack>
  )
}

export default FullSnippetBody
