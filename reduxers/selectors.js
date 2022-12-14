import {createSelector} from 'reselect';

const selectNews = state => state.news;
const selectHacker = state => state.users;

export const selectNewsLoader = createSelector(
  [selectNews],
  news => news.loading,
);

export const selectNewsError = createSelector(
  [selectNews],
  news => news.errors,
);

export const selectStoryIds = currentPage =>
  createSelector([selectNews], news => news.storyIds?.slice(0, currentPage));

export const selectStory = createSelector([selectNews], news => news.stories);

export const selectUserInfo = createSelector(
  [selectHacker],
  users => users?.info,
);

export const selectUserLoader = createSelector(
  [selectHacker],
  users => users?.loading,
);

export const selectAuth = createSelector(
  [selectHacker],
  users => users?.isAuth,
);
