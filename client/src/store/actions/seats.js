import { SELECT_SEAT, DESELECT_SEAT, CLEAR_SEATS } from './actionTypes';

//select seat
export const selectSeat = (seat) => ({
  type: SELECT_SEAT,
  payload: seat,
});

//deselect seat
export const deselectSeat = (seat) => ({
  type: DESELECT_SEAT,
  payload: seat,
});

//clear seats
export const clearSeats = () => ({
  type: CLEAR_SEATS,
});
