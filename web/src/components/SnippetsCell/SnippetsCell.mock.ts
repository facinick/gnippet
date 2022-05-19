// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  snippets: [
    {
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
    {
      id: 2,
      title: "yet another snippet by the sexy admin",
      body: "this time i am not going to tell you thow to nultiply two in to",
      createdAt: "2022-05-16T12:01:48Z",
      comments: [
        {
          id: 4,
          createdAt: "2022-05-16T12:01:48Z",
          body: "look at me commenting everywhere I go yahaaa",
          author: {
            username: "facinick",
          }
        },
      ],
      score: 23,
      activity: 1,
      author: {
        username: "bianca",
      }
    },
    {
      id: 3,
      title: "this is how we multiply two random numbers",
      body: "No way is this going to work, but lets see how it spans out to be in a fed up planet",
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
      score: 3,
      activity: 3,
      author: {
        username: "facinick",
      }
    },
    {
      id: 4,
      title: "how did the world end",
      body: "well well well fi it isnt my nigga how did he die lmao",
      createdAt: "2022-05-16T12:01:48Z",
      comments: [
        {
          id: 5,
          createdAt: "2022-05-16T12:01:48Z",
          body: "this is a sample comment how do i look?",
          author: {
            username: "bianca",
          }
        },
        {
          id: 6,
          createdAt: "2022-05-16T12:01:48Z",
          body: "this is a sample comment TWO how do i look?",
          author: {
            username: "bianca",
          }
        },
      ],
      score: 0,
      activity: 2,
      author: {
        username: "facinick",
      }
    },
  ],
})
