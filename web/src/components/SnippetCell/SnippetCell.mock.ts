// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  snippet: {
    id: 1,
    title: "sample snippet",
    body: "this is how to multiply 2 into 2",
    createdAt: "2022-05-16T12:01:48Z",
    comments: [
      {
        id: 1,
        createdAt: "2022-05-16T12:01:48Z",
        body: "this is a sample comment how do i look?",
        author: {
          username: "bianca",
        }
      },
      {
        id: 2,
        createdAt: "2022-05-16T12:01:48Z",
        body: "this is a sample comment TWO how do i look?",
        author: {
          username: "bianca",
        }
      },
      {
        id: 3,
        createdAt: "2022-05-16T12:01:48Z",
        body: "this is a sample comment THREE how do i look?",
        author: {
          username: "bianca",
        }
      }
    ],
    score: 5,
    activity: 3,
    author: {
      username: "facinick",
    }
  },
})
