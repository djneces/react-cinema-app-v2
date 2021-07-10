import React from 'react';
import { connect } from 'react-redux';
import Row from './Row/Row';
import SpinnerDots from '../SpinnerDots/SpinnerDots';
import './SeatSelector.scss';

const SeatSelector = ({ occupancyIsLoading }) => {
  return (
    <div className='SeatSelector'>
      <div className='SeatSelector__screen'></div>
      {occupancyIsLoading && <SpinnerDots />}

      <div className='SeatSelector__seatingPlan'>
        <Row rowNumber={1} />
        <Row rowNumber={2} />
        <Row rowNumber={3} />
        <Row rowNumber={4} />
        <Row rowNumber={5} />
        <Row rowNumber={6} />
        <Row rowNumber={7} />
        <div className='SeatSelector__seatingPlan--space'></div>
        <Row rowNumber={8} />
        <Row rowNumber={9} />
        <Row rowNumber={10} />
        <Row rowNumber={11} />
        <Row rowNumber={12} />
        <Row rowNumber={13} />
      </div>
      <div className='SeatSelector__hint'>
        <div>
          <span className='SeatSelector__hint-available'>#</span>
          <span>available</span>
        </div>
        <div>
          <span className='SeatSelector__hint-taken'></span>
          <span>taken</span>
        </div>
        <div>
          <span className='SeatSelector__hint-selected'></span>
          <span>selected</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ occupancy }) => ({
  occupancyIsLoading: occupancy.loading,
});

export default connect(mapStateToProps)(SeatSelector);
