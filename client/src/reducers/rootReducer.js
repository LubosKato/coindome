import { combineReducers } from 'redux';
import translationReducer from './translationReducer';
import currencyReducer from './currencyReducer';

export const rootReducer = combineReducers({
  translation: translationReducer,
  currency: currencyReducer,
});
