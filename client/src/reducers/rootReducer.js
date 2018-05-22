import { combineReducers } from 'redux';
import translationReducer from './translationReducer';

export const rootReducer = combineReducers({
  translation: translationReducer,
});
