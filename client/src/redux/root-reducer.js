import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { wordReducer } from './word/word.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['word'],
};

const rootReducer = combineReducers({
	word: wordReducer,
});

export default persistReducer(persistConfig, rootReducer);
