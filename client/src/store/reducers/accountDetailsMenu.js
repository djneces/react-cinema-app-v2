/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE_ACCOUNT_DETAILS } from '../actions/actionTypes';
const initialState = false;

const toggleMenu = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case TOGGLE_ACCOUNT_DETAILS:
      return !state;
    default:
      return state;
  }
};

export default toggleMenu;
