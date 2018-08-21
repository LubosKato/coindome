import { SET_CURRENCY } from '../constants/generalConstants';

export  function setCurrency(currency) {
  return {
    type: SET_CURRENCY,
    currency,
  };
}
