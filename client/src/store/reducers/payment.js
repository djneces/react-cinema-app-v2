import {
  PROCESS_PAYMENT_START,
  PROCESS_PAYMENT_SUCCESS,
  PROCESS_PAYMENT_FAIL,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAIL,
  CLEAR_PAYMENT_STATUS,
} from '../actions/actionTypes';

const initialState = {
  payments: [],
  stripeCharged: null,
  loading: false,
  error: null,
};

const payment = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROCESS_PAYMENT_START:
      return { ...state, loading: true };
    case PROCESS_PAYMENT_SUCCESS:
      return {
        ...state,
        stripeCharged: payload,
        loading: false,
      };
    case UPDATE_PAYMENT_STATUS_FAIL:
    case PROCESS_PAYMENT_FAIL:
      return { ...state, payments: [], loading: false, error: payload };
    case UPDATE_PAYMENT_STATUS_SUCCESS:
      return { ...state, payments: [...state.payments, payload] };

    case CLEAR_PAYMENT_STATUS:
      return {
        ...state,
        payments: [],
        stripeCharged: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default payment;
