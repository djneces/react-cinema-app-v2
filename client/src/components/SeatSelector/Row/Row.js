import React from 'react';
import Seat from '../Seat/Seat';
import './Row.scss';

const Row = ({ rowNumber }) => {
  const renderRow = () => {
    //creates an array 1-17 (seats in a row)
    return Array.from({ length: 17 }, (_, i) => i + 1).map((seat) => (
      <Seat seatNumber={seat} key={seat} rowNumber={rowNumber} />
    ));
  };

  return (
    <div className='Row'>
      <span>{rowNumber}</span>
      {renderRow()}
    </div>
  );
};

export default Row;
