import { createSelector } from 'reselect';

export const selectWords = (state) => state.word;

export const selectWordsItems = createSelector(
  [selectWords],
  (w) => w.words
);

