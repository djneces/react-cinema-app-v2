import {
  SELECT_SEAT,
  DESELECT_SEAT,
  CLEAR_SEATS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  selectedSeats: [],
};

const seatsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECT_SEAT:
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, payload],
      };
    case DESELECT_SEAT:
      return {
        ...state,
        selectedSeats: [
          ...state.selectedSeats.filter(
            (movie) =>
              !(movie.row === payload.row && movie.seat === payload.seat)
          ),
        ],
      };
    case CLEAR_SEATS:
      return {
        ...state,
        selectedSeats: [],
      };
    default:
      return state;
  }
};

export default seatsReducer;
