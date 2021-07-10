import React from 'react';
import { connect } from 'react-redux';
import {
  selectMovieTime,
  deselectMovieTime,
} from '../../../../store/actions/movies';
import { showTimeBlocks } from '../../../../assets/moviesSeed';
import './TimeBlock.scss';

const TimeBlock = ({
  selectMovieTime,
  deselectMovieTime,
  day,
  block,
  taken,
  selectedMovieTime,
}) => {
  //based on selected day and time block
  const selectedBlock = {
    time: `${day}: ${showTimeBlocks[block]}`,
    dbTime: { day: day.toLowerCase(), block },
  };

  const renderClick = () => {
    //compare clicked time-block with what is in Redux
    if (selectedMovieTime === selectedBlock.time) {
      deselectMovieTime();
      return;
    }

    selectMovieTime(selectedBlock);
  };

  return (
    <div
      className={`TimeBlock ${taken === 'taken' ? 'taken' : 'notTaken'} ${
        selectedMovieTime === selectedBlock.time ? 'selected' : ''
      }`}
      onClick={renderClick}
    >
      {selectedMovieTime === selectedBlock.time && taken === 'taken' ? (
        <>
          <i className='fas fa-check'></i>
          {selectedBlock.time}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ movies }) => ({
  selectedMovieTime: movies.selectedMovieTime.time,
});

export default connect(mapStateToProps, { selectMovieTime, deselectMovieTime })(
  TimeBlock
);
