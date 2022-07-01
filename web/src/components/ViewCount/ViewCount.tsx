import { Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import Space from '../Space/Space'

const StyledViewCount = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.containerPrimary.contrastText,
    fontSize: '14px'
  })
)

interface Props {
  viewCount: number
}

const ViewCount = ({ viewCount }: Props) => {

  const text = viewCount === 1 ? "view" : "views"

  return (
    <StyledViewCount title={'Approximate count of unique viewers'}>
      {viewCount}
      <Space />
      {text}
    </StyledViewCount>
  )
}

export default ViewCount
