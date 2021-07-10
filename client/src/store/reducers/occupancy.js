import {
  FETCH_OCCUPANCY_START,
  FETCH_OCCUPANCY_SUCCESS,
  FETCH_OCCUPANCY_FAIL,
  CLEAR_OCCUPANCY,
  SAVE_OCCUPANCY_SUCCESS,
  SAVE_OCCUPANCY_FAIL,
} from '../actions/actionTypes';

const initialState = {
  fetchedOccupancy: null,
  loading: false,
  error: null,
  newBookings: [],
};

const occupancy = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_OCCUPANCY_START:
      return { ...state, loading: true };
    case FETCH_OCCUPANCY_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchedOccupancy: payload,
      };
    case FETCH_OCCUPANCY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SAVE_OCCUPANCY_SUCCESS:
      return {
        ...state,
        newBookings: [...state.newBookings, payload],
      };
    case SAVE_OCCUPANCY_FAIL:
      return {
        ...state,
        newBookings: [],
        error: payload,
      };
    case CLEAR_OCCUPANCY:
      return {
        ...state,
        fetchedOccupancy: null,
        loading: false,
        error: null,
        newBookings: [],
      };
    default:
      return state;
  }
};

export default occupancy;
