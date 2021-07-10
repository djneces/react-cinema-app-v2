import React from 'react';
import { connect } from 'react-redux';
import { TICKET_PRICE } from '../../assets/moviesSeed';
import {
  renderAddOnType,
  isSelected,
  isAddOnsEmpty,
  calculateTotal,
} from './AddOnsUtil';
import './AddOnsSummary.scss';

const AddOnsSummary = ({ addOns, selectedSeats }) => {
  const seatNumbers = selectedSeats
    .map((seat) => `seat ${seat.seat}/ row ${seat.row}`)
    .join(', ');

  return (
    <div className='AddOnsSummary'>
      {!isAddOnsEmpty(addOns) ? (
        <>
          <h3>Your AddOns</h3>
          <div className='AddOnsSummary__items'>
            {isSelected('coffee', addOns) && (
              <div className='AddOnsSummary__items-item'>
                <h4>Coffee</h4>
                {renderAddOnType('coffee', addOns)}
              </div>
            )}

            {isSelected('coke', addOns) && (
              <div className='AddOnsSummary__items-item'>
                <h4>Coke</h4>
                {renderAddOnType('coke', addOns)}
              </div>
            )}
            {isSelected('popcorn', addOns) && (
              <div className='AddOnsSummary__items-item'>
                <h4>Popcorn</h4>
                {renderAddOnType('popcorn', addOns)}
              </div>
            )}
          </div>
        </>
      ) : null}

      <h3>Your Tickets</h3>
      <div className='AddOnsSummary__seats'>
        <span>{seatNumbers}</span>
        <span>
          {selectedSeats && selectedSeats.length} tickets x ${TICKET_PRICE}
        </span>
      </div>
      <div className='AddOnsSummary__total'>
        <h3>Total</h3>${' '}
        {selectedSeats && calculateTotal(addOns, selectedSeats, TICKET_PRICE)}
      </div>
    </div>
  );
};
const mapStateToProps = ({ addOns, seats }) => ({
  addOns: addOns.addOns,
  selectedSeats: seats.selectedSeats,
});

export default connect(mapStateToProps)(AddOnsSummary);
