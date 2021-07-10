import React from 'react';
import { connect } from 'react-redux';
import { DB, showTimeBlocks } from '../../../assets/moviesSeed';

import TimeBlock from './TimeBlock/TimeBlock';
import './ShowTimesDay.scss';

const ShowTimesDay = ({ day, selectedMovie }) => {
  const { movies } = DB;
  const movie = movies.find(({ movieId }) => movieId === selectedMovie);

  const renderDay = () => {
    const allTimeBlocks = Object.keys(showTimeBlocks);

    const timeBlocks = movie?.showTimes[day.toLowerCase()];

    return allTimeBlocks.map((block) => {
      return timeBlocks?.includes(+block) ? (
        <TimeBlock
          taken={'taken'}
          day={day}
          block={+block}
          key={`${day}_${showTimeBlocks[+block]}`}
        />
      ) : (
        <TimeBlock
          taken={'notTaken'}
          day={day}
          block={+block}
          key={`${day}_${showTimeBlocks[+block]}`}
        />
      );
    });
  };

  return (
    <div className='ShowTimesDay'>
      <span>{day}</span>
      {renderDay()}
    </div>
  );
};

const mapStateToProps = ({ movies }) => ({
  selectedMovie: movies.selectedMovie,
});

export default connect(mapStateToProps)(ShowTimesDay);
