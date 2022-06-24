import { Button } from '@mui/material'
import { routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'
import LinkIcon from '@mui/icons-material/Link'

interface CopySnippetUrl {
  id: number
}

const CopySnippetUrl = ({ id }: Props) => {
  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}${routes.snippet({ id })}`
    )
    toast.success('copied!')
  }

  return (
    <Button title={'Copy URL'} color={'primary'} onClick={onCopyLink}>
      <LinkIcon />
    </Button>
  )
}

export default CopySnippetUrl
