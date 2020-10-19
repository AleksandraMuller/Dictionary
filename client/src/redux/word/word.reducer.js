import { WordActionTypes } from './word.types';

const INITIAL_STATE = {
  words: [],
  
};

export const wordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WordActionTypes.ADD_WORDS:
      return {
        ...state,
        words: [...state.words, action.payload],
      };
    default:
      return state;
  }
};
