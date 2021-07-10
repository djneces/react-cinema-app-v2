import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectMovie, deselectMovie } from '../../../store/actions/movies';
import './MovieItem.scss';

const MovieItem = ({
  movieId,
  fetchedMovies,
  selectMovie,
  deselectMovie,
  selectedMovie,
  history,
}) => {
  const [loaded, setLoaded] = useState(false);

  if (_.isEmpty(fetchedMovies)) return;
  const { title, posterUrl } = fetchedMovies[movieId];

  const onSelectMovie = () => {
    //if select clicked 2x for the same movie => deselects
    if (selectedMovie === movieId) {
      deselectMovie();
      return;
    }
    selectMovie(movieId);
  };
  return (
    <div className='MovieItem'>
      {fetchedMovies === undefined || _.isEmpty(fetchedMovies) ? (
        <div>Loading</div>
      ) : (
        <>
          <div className='MovieItem__poster'>
            <div className='MovieItem__poster-overlay'>
              {loaded ? null : (
                <div className='MovieItem__poster-overlay-notLoaded'>
                  <i className='fas fa-spinner fa-pulse'></i>
                </div>
              )}
              <img
                src={posterUrl}
                style={loaded ? {} : { display: 'none' }}
                onLoad={() => setLoaded(true)}
                onClick={() => history.push(`/movies/${movieId}`)}
                alt='poster'
                className={`${
                  selectedMovie !== movieId && selectedMovie !== null
                    ? 'blackWhite'
                    : ''
                }`}
              />
              {loaded && (
                <div className='MovieItem__poster-overlay-menu'>
                  <i
                    className='fas fa-info-circle'
                    onClick={() => history.push(`/movies/${movieId}`)}
                  ></i>
                  <i
                    className={`${
                      selectedMovie && selectedMovie === movieId
                        ? 'fas fa-minus-circle'
                        : 'fas fa-plus-circle'
                    }`}
                    onClick={onSelectMovie}
                  ></i>
                </div>
              )}
            </div>
          </div>
          <div className='MovieItem__title'>{title}</div>
        </>
      )}
    </div>
  );
};
const mapStateToProps = ({ movies }) => ({
  fetchedMovies: movies?.fetchedMovies,
  selectedMovie: movies?.selectedMovie,
});

export default withRouter(
  connect(mapStateToProps, { selectMovie, deselectMovie })(MovieItem)
);
