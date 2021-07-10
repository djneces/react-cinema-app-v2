import {
  FETCH_OCCUPANCY_START,
  FETCH_OCCUPANCY_SUCCESS,
  FETCH_OCCUPANCY_FAIL,
  CLEAR_OCCUPANCY,
  SAVE_OCCUPANCY_SUCCESS,
  SAVE_OCCUPANCY_FAIL,
} from './actionTypes';
import axios from '../../axios-orders';
import { setAlert } from './alert';

//FETCH OCCUPANCY FAIL
export const fetchOccupancyFail = (error) => {
  return {
    type: FETCH_OCCUPANCY_FAIL,
    payload: error,
  };
};

//FETCH OCCUPANCY START
export const fetchOccupancyStart = () => {
  return {
    type: FETCH_OCCUPANCY_START,
  };
};

//CLEAR ALL OCCUPANCY
export const clearOccupancy = () => {
  return {
    type: CLEAR_OCCUPANCY,
  };
};

//FETCH OCCUPANCY
export const fetchOccupancy =
  (selectedMovieId, selectedDay, selectedTimeBlock) => (dispatch) => {
    if (!selectedMovieId) return;
    dispatch(fetchOccupancyStart());
    axios
      .get(
        `/seedDb/${selectedMovieId}/${selectedDay}/timeBlock/${selectedTimeBlock}/.json`
      )
      .then((response) => {
        if (response.status === 200) {
          let responseData;
          //if no seats booked in the DB
          if (response.data === null) {
            responseData = 0;
          } else {
            //if some seats booked, fetch them
            responseData = response.data;
          }
          dispatch({
            type: FETCH_OCCUPANCY_SUCCESS,
            payload: responseData,
          });
        } else {
          dispatch(setAlert('Network error, data not loaded', 'danger'));
          dispatch(fetchOccupancyFail('Network error, data not loaded'));
          console.error('Network error, data not loaded');
          throw Error('Network error, data not loaded');
        }
      })
      .catch((err) => {
        dispatch(fetchOccupancyFail(err));
        dispatch(setAlert('Data could not be loaded', 'danger'));
        console.error(err);
      });
  };

export const saveOccupancy =
  (selectedMovieId, selectedDay, selectedTimeBlock, rowNumber, seatNumber) =>
  (dispatch) => {
    if (!selectedMovieId) return;
    const bookingStatus = {
      booked: true,
    };
    axios
      .put(
        `/seedDb/${selectedMovieId}/${selectedDay}/timeBlock/${selectedTimeBlock}/row/${rowNumber}/seat/${seatNumber}.json`,
        bookingStatus
      )
      .then((response) => {
        if (response.status === 200) {
          const savedData = {
            selectedMovieId,
            selectedDay,
            selectedTimeBlock,
            seats: { row: rowNumber, seat: seatNumber },
            status: response.data.booked,
          };

          dispatch({
            type: SAVE_OCCUPANCY_SUCCESS,
            payload: savedData,
          });
        } else {
          dispatch(setAlert('Network error, data not saved', 'danger'));
          console.error('Network error, data not saved');
        }
      })
      .catch((err) => {
        dispatch({
          type: SAVE_OCCUPANCY_FAIL,
          payload: err,
        });
        console.error(err);
      });
  };
