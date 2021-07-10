import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  CLEAR_ORDER_HISTORY,
} from '../actions/actionTypes';

const initialState = {
  orderHistory: [],
  loading: false,
};

const orderHistory = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDERS_START:
      return { ...state, loading: true };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orderHistory: payload.reverse(), loading: false };
    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false };
    case CLEAR_ORDER_HISTORY:
      return { ...state, orderHistory: [], loading: false };
    default:
      return state;
  }
};

export default orderHistory;
