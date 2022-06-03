import { pastDateString } from "src/components/CreatedAt/CreatedAt.test";

export const facinick = {
  id: 1,
  username: 'facinick',
  createdAt: pastDateString,
  updatedAt: pastDateString,
  roles: "",
  isBanned: false,
  snippets: [],
  comments: [],
  votes: [],
  bookmarks: []
}

export const snippet = {
  id: 1,
  title: 'snippet title',
  body: 'snippet body',
  createdAt: pastDateString,
  updatedAt: pastDateString,
  votes: [],
  comments: [],
  author: facinick
}

export const comment = {
  id: 1,
  body: 'comment body',
  createdAt: pastDateString,
  updatedAt: pastDateString,
  votes: [],
  comments: [],
  author: facinick,
  snippet: snippet,
}