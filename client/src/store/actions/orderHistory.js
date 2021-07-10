import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  CLEAR_ORDER_HISTORY,
} from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from '../actions/alert';

//FETCH ORDERS FAIL
export const fetchOrdersFail = (error) => {
  return {
    type: FETCH_ORDERS_FAIL,
    error: error,
  };
};

//FETCH ORDER START
export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START,
  };
};

//CLEAR ALL HISTORY
export const clearOrderHistory = () => {
  return {
    type: CLEAR_ORDER_HISTORY,
  };
};

export const fetchOrderHistory = (userId) => async (dispatch) => {
  if (!userId) return;
  dispatch(fetchOrdersStart());
  //returns array of orderHistory needed in actions/payment - updatePaymentStatus
  return await axios
    .get(`/users/${userId}/orders/.json`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: FETCH_ORDERS_SUCCESS,
          payload: Object.values(response.data),
        });
        return Object.values(response.data);
      } else {
        dispatch(setAlert('No records found', 'danger'));
        dispatch(fetchOrdersFail('No records found'));
        console.error('No records found');
      }
    })
    .catch((err) => {
      dispatch(fetchOrdersFail(err));
      dispatch(setAlert('Data could not be loaded', 'danger'));
      console.error(err);
    });
};
