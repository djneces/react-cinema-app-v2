import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import SeatSelector from '../../components/SeatSelector/SeatSelector';
import { fetchOccupancy } from '../../store/actions/occupancy';
import './SelectSeatPage.scss';

const SelectSeatPage = ({
  fetchOccupancy,
  selectedMovieId,
  selectedDay,
  selectedTimeBlock,
}) => {
  useEffect(() => {
    fetchOccupancy(selectedMovieId, selectedDay, selectedTimeBlock);
  }, [fetchOccupancy, selectedMovieId, selectedDay, selectedTimeBlock]);
  return (
    <div className='SelectSeatPage'>
      <SeatSelector />
      <OrderSummary />
    </div>
  );
};

const mapStateToProps = ({ movies }) => ({
  selectedMovieId: movies.selectedMovie,
  selectedDay: movies.selectedMovieTime.dbTime.day,
  selectedTimeBlock: movies.selectedMovieTime.dbTime.block,
});

export default connect(mapStateToProps, { fetchOccupancy })(SelectSeatPage);
