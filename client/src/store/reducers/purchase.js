import {
  PURCHASE_START,
  PURCHASE_SUCCESS,
  PURCHASE_FAIL,
  CLEAR_ALL_PURCHASES,
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
};

const purchase = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PURCHASE_START:
      return { ...state, loading: true };
    case PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, payload],
      };
    case PURCHASE_FAIL:
      return { ...state, loading: false };
    case CLEAR_ALL_PURCHASES:
      return { ...state, orders: [], loading: false };
    default:
      return state;
  }
};

export default purchase;
