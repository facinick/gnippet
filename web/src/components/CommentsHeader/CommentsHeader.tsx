import Typography from "@mui/material/Typography"

const CommentsHeader = ({ numberOfComments }: { numberOfComments: number }) => (
  <>
    {numberOfComments > 0 ?

    numberOfComments === 1 ?
    (
      <Typography textAlign={'center'} variant='body2'>~ {numberOfComments} comment ~</Typography>
    )
    :
    (
      <Typography textAlign={'center'} variant='body2'>~ {numberOfComments} comments ~</Typography>
    )
    :(
      <Typography textAlign={'center'} variant='body2'>no comments, such empty!</Typography>
    )}
  </>
)

export default CommentsHeader



