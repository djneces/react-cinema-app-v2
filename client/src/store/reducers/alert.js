/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';
const initialState = [];

const alerts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      //payload here is the Id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alerts;
