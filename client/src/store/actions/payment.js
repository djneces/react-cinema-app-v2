import axiosOrders from '../../axios-orders';
import axios from 'axios';

import { fetchOrderHistory } from './orderHistory';
import { setAlert } from './alert';
import {
  PROCESS_PAYMENT_START,
  PROCESS_PAYMENT_SUCCESS,
  PROCESS_PAYMENT_FAIL,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAIL,
  CLEAR_PAYMENT_STATUS,
} from './actionTypes';

//process payment start
export const processPaymentStart = () => {
  return {
    type: PROCESS_PAYMENT_START,
  };
};

//process payment success
export const processPaymentSuccess = () => {
  return {
    type: PROCESS_PAYMENT_SUCCESS,
    payload: true,
  };
};

//update order payment status in the DB
export const updatePaymentStatus = (userId, orderId, history) => (dispatch) => {
  const orderTotal = { paid: true };
  axiosOrders
    .patch(`/users/${userId}/orders/${orderId}/orderTotal/.json`, orderTotal)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: UPDATE_PAYMENT_STATUS_SUCCESS,
          payload: { paid: true, orderId },
        });
      }
    })
    .then(() => {
      //returns a new updated array so we can use it in the next step
      return dispatch(fetchOrderHistory(userId));
    })
    .then((data) => {
      //shows either remaining outstanding orders or redirects back to  '/'
      if (data.some((order) => order.orderTotal.paid === false)) {
        history.push('/payment');
      } else {
        history.push('/');
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: UPDATE_PAYMENT_STATUS_FAIL,
        payload: error,
      });
    });
};

//process payment fail
export const processPaymentFail = (error) => {
  return {
    type: PROCESS_PAYMENT_FAIL,
    payload: error,
  };
};

//clear all payment statuses
export const clearPaymentStatus = () => {
  return {
    type: CLEAR_PAYMENT_STATUS,
  };
};

//process payment
export const processPayment =
  (priceForStripe, token, userId, orderId, history) => (dispatch) => {
    dispatch(processPaymentStart());
    //process Stripe payment
    axios({
      url: 'process-payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        if (response.data.success.paid === true) {
          //update payment status in the DB
          dispatch(updatePaymentStatus(userId, orderId, history));
          dispatch(
            setAlert('Your order has been successfully paid', 'booked', 5000)
          );
          dispatch(processPaymentSuccess());
        } else {
          dispatch(setAlert('Payment error, please try again', 'danger', 5000));
          throw new Error('Payment error - not paid');
        }
      })
      .catch((error) => {
        console.error('Payment error: ' + JSON.parse(error));
        dispatch(processPaymentFail(error));
        dispatch(
          setAlert(
            'There was an issue with your payment. Please provide a valid credit card.',
            'danger',
            5000
          )
        );
      });
  };
