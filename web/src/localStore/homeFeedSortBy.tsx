import { makeVar } from "@apollo/client";

export const ITEMS_PER_PAGE = 2

export const DEFAULT_HOME_FEEED_SORT_BY = 'new'

export const homeFeedSortByValues = ['new' , 'activity' , 'score'] as const

export type HomeFeedSortBy = typeof homeFeedSortByValues[number]

// Create the initial value
const field: HomeFeedSortBy = DEFAULT_HOME_FEEED_SORT_BY

// Create the todos var and initialize it with the initial value
export const sortByVar = makeVar<HomeFeedSortBy>(
  field
);

export const setSortBy = ({field}: {field: HomeFeedSortBy}) => sortByVar(field)