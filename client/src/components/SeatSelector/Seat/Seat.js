import React from 'react';
import { connect } from 'react-redux';

import { selectSeat, deselectSeat } from '../../../store/actions/seats';
import './Seat.scss';

const Seat = ({
  rowNumber,
  seatNumber,
  selectSeat,
  deselectSeat,
  selectedSeats,
  occupancy,
}) => {
  const onClickSeat = { seat: seatNumber, row: rowNumber };

  //check if the seat was already booked before
  const isSeatBooked = () => {
    //if 0 seats are booked
    if (occupancy === 0) return false;

    //if seats (at all) are booked in this specific row
    if (occupancy && rowNumber in occupancy.row) {
      //if specific seat is booked in this specific row
      if (
        occupancy &&
        seatNumber in occupancy.row[rowNumber].seat &&
        occupancy.row[rowNumber].seat[seatNumber].booked === true
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const renderSeat = () => {
    return (
      //renders styles for taken seats(booked) and selected seats
      <div
        className={`Seat ${isSeatBooked() && 'booked'} ${
          selectedSeats &&
          selectedSeats.some(
            (savedSeat) =>
              savedSeat.seat === onClickSeat.seat &&
              savedSeat.row === onClickSeat.row
          )
            ? 'selected'
            : ''
        }`}
        onClick={renderClick}
      >
        {seatNumber}
      </div>
    );
  };
  const renderClick = () => {
    //compare clicked time-block with what is in Redux
    if (
      selectedSeats &&
      selectedSeats.some(
        (savedSeat) =>
          savedSeat.seat === onClickSeat.seat &&
          savedSeat.row === onClickSeat.row
      )
    ) {
      deselectSeat(onClickSeat);
      return;
    }

    selectSeat(onClickSeat);
  };
  return renderSeat();
};

const mapStateToProps = ({ seats, movies, occupancy }) => ({
  selectedSeats: seats.selectedSeats,
  selectedMovie: movies.selectedMovie,
  selectedMovieDay: movies.selectedMovieTime.dbTime.day,
  selectedMovieBlock: movies.selectedMovieTime.dbTime.block,
  occupancy: occupancy.fetchedOccupancy,
});

export default connect(mapStateToProps, { selectSeat, deselectSeat })(Seat);
