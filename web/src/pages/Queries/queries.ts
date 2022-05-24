export const USER_DATA_QUERY = gql`
  query FindUserQuery($id: Int!, $votes: Boolean!, $snippets: Boolean!, $comments: Boolean!) {
    user: user(id: $id) {
      id
      username
      roles
      isBanned
      avatarUrl
      bio
      createdAt
      snippets(input: { orderBy: { createdAt: desc }}) @include(if: $snippets) {
        id
        title
        body
        createdAt
        activity
        score
        author {
          username
        }
      }
      votes @include(if: $votes) {
        id
        snippetId
        commentId
        userId
        value
        entityType
      }
      comments(input: { orderBy: { createdAt: desc }}) @include(if: $comments) {
        id
        body
        createdAt
        score
        activity
        author {
          username
        }
      }
    }
  }
`

// export const USER_PUBLIC_DATA_QUERY = gql`
//   query FindUserQuery($username: String!, $comments: Boolean!, $snippets: Boolean!) {
//     user: userByUsername(username: $username) {
//       id
//       username
//       roles
//       isBanned
//       avatarUrl
//       bio
//       createdAt
//       snippets(input: { orderBy: { createdAt: desc }}) @include(if: $snippets) {
//         id
//         title
//         body
//         createdAt
//         activity
//         score
//         author {
//           username
//         }
//       }
//       comments(input: { orderBy: { createdAt: desc }}) @include(if: $comments) {
//         id
//         body
//         createdAt
//         score
//         activity
//         author {
//           username
//         }
//       }
//     }
//   }
// `