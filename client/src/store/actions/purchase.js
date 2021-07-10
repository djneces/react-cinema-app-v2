import axios from '../../axios-orders';

import { setAlert } from './alert';
import { clearMovies } from './movies';
import { clearSeats } from './seats';
import { clearAllAddOns } from './addons';
import { fetchOrderHistory } from './orderHistory';

import {
  PURCHASE_START,
  PURCHASE_SUCCESS,
  PURCHASE_FAIL,
  CLEAR_ALL_PURCHASES,
} from './actionTypes';
import { saveOccupancy } from './occupancy';

//purchase start
export const purchaseStart = () => {
  return {
    type: PURCHASE_START,
  };
};

//purchase success
export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: PURCHASE_SUCCESS,
    payload: { id: orderId, orderedTickets: orderData },
  };
};

//purchase fail
export const purchaseFail = (error) => {
  return {
    type: PURCHASE_FAIL,
    error: error,
  };
};

//clear all purchases
export const clearAllPurchases = () => {
  return {
    type: CLEAR_ALL_PURCHASES,
  };
};

//create order
export const createOrder = (orderDetails, userId, history) => (dispatch) => {
  dispatch(purchaseStart());
  axios
    .post(`/users/${userId}/orders/.json`, orderDetails)
    .then((response) => {
      if (response.status === 200) {
        //update the DB with the DB order Id
        const orderDbId = { orderId: response.data.name };
        axios
          .patch(
            `/users/${userId}/orders/${response.data.name}.json`,
            orderDbId
          )
          .then(() => {
            dispatch(fetchOrderHistory(userId));
          })
          .catch((err) => {
            console.error(err);
          });

        dispatch(purchaseSuccess(response.data.name, orderDetails));
      } else {
        dispatch(purchaseFail(response.statusText));
      }
    })
    .then(() => {
      const { selectedMovie, selectedMovieTimeDb, selectedSeats } =
        orderDetails;
      selectedSeats.forEach((seat) =>
        dispatch(
          saveOccupancy(
            selectedMovie,
            selectedMovieTimeDb.day,
            selectedMovieTimeDb.block,
            seat.row,
            seat.seat
          )
        )
      );

      dispatch(
        setAlert(
          `Ticket${
            orderDetails.selectedSeats.length > 1 ? 's' : ''
          } has been booked, please proceed to payment.`,
          'booked',
          5000
        )
      );
    })
    .then(() => {
      //get the updated orders
      history.push('/payment');
      dispatch(clearMovies());
      dispatch(clearSeats());
      dispatch(clearAllAddOns());
    })
    .catch((err) => {
      console.error(err);
      dispatch(purchaseFail(err));
      dispatch(setAlert('Something went wrong, please try again', 'danger'));
    });
};
