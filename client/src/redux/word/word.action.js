import { WordActionTypes } from './word.types';

export const addWords = (word) => ({
  type: WordActionTypes.ADD_WORDS,
  payload: word,
});



// export const addInput = (input) => ({
//   type: CharacterActionTypes.ADD_USER_INPUT,
//   payload: input,
// });