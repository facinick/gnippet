import { makeVar } from "@apollo/client";

export type HomeFeedSortBy = 'new' | 'activity' | 'score'

// Create the initial value
const field: HomeFeedSortBy = 'new'

// Create the todos var and initialize it with the initial value
export const sortByVar = makeVar<HomeFeedSortBy>(
  field
);

export const setSortBy = ({field}: {field: HomeFeedSortBy}) => sortByVar(field)