import { Page, Tag, User } from "types/graphql";

export const formatUsers = (users: Array<User>) => {
  return users.map((user) => {
    return {
      type: 'users',
      label: user.username,
      id: user.username
    }
  })
}

export const formatPages = (pages: Array<Page>) => {
  return pages.map((page) => {
    return {
      type: 'pages',
      label: page.name,
      id: page.id
    }
  })
}

export const formatTags = (tags: Array<Tag>) => {
  return tags.map((tag) => {
    return {
      type: 'tags',
      label: tag.name,
      id: tag.id
    }
  })
}