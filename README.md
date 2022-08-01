# Gnippet 

> ReadMe is under development, but you can check the demo and browse the code. (obviously). Documentation for setting up DB, seeding, installing modules, building app and serving the app is pending.

## Purpose

To learn and share with other begineers who can learn or can help me learn. Also to use it as my personal blog to post random things that come to my head.

## Features 🚀

- 👤 Authentication (signup, signin) using JWT
- 🎨 Themes (red, blue, black, default, green)
- 🌙 Night mode and day mode for every theme
- ✍️ Create posts
- ✍️ Comment on posts, comment on comments
- 👍 Vote posts and comments *(upvote or downvote)*
- 🔖 Bookmark posts and comments
- 👀 View bookmarked posts and comments in profile
- 👀 View voted posts and comments in profile
- 👀 View created posts and comments in profile
- 🔎 Search Users and Tags on Home page
- 🧮 Count approximately unique visits on posts
- 🖼️ Create posts with pictures
- #️⃣ Add tags while creating posts
- 👀 View posts by tags
- 🗂️ Sort post by votes *(no. of upvotes - no. of downvotes)*, activity *(no. of comments)* and time *(recent)*
- ⏱️ Reading time for posts

## Low level features 🛺

- Skip / Take pagination for posts on Home page
- Cursor based paination for posts on Tags page
- Global state management with apollo
- Local state management with react hooks
- Remote state management with apollo
- Updating Apollo cache upon query and mutation completion
- DB Modelling of users, posts, pages, comments, votes, tags, bookmarks, post visitors demoing various entity relationships (one-one, one-many, many-many, many-one)
- Responsiveness
- Search autocomplete feature

## Tech

- GraphQL
- Prisma
- PostgreSQL
- JWT
- React JS
- CSS
- MUI 5
- Lottie Animation

## Prisma schema ERD 🗺️ (might not be accurate, created using https://prisma-erd.simonknott.de/)

![gnippet-prisma-erd](https://user-images.githubusercontent.com/12322728/182235092-18c0d750-2659-46c3-a325-cf1db9a6b441.svg)

## Upcoming 📅

- Notifications (notify users when their posts are voted and commented on in real time)
- Show Lottie animation for new posts
- Rich Text Editor
- PWA
- Move architecture to Domain Driven Design
