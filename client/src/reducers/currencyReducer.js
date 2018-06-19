import { SET_CURRENCY } from './../constants/generalConstants';

// Initial state
export const initialState = {
  currency: 'USD', // default currency,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENCY:
      return {state, currency: action.currency };
    default:
      return state;
  }
}
